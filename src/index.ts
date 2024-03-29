import {unflatten} from 'flat'
import * as fs from 'fs'
import * as path from 'path'

import typeArg from './lib/config/arg'
import typeDefault from './lib/config/default'
import typeDynamodb from './lib/config/dynamodb'
import typeEnv from './lib/config/env'
import typeJavascript from './lib/config/javascript'
import typeJson from './lib/config/json'
import typeJson5 from './lib/config/json5'
import typeSecretManager from './lib/config/secret-manager'
import {realTypeOf} from './lib/helpers'

export interface SchemaItem<Type = any> {
    key: string
    type: string
    allowed?: Type[]
    default?: Type
    nullable?: boolean
}

export enum ConfigType {
    ARG = 'arg',
    DYNAMODB = 'aws-dynamodb',
    DEFAULT = 'default',
    ENV = 'env',
    JAVASCRIPT = 'javascript',
    JSON = 'json',
    JSON5 = 'json5',
    SECRET_MANAGER = 'secret-manager',
}

export type ConfigTypeMethod = (
    options: OptionsConfigItemOptions,
) => Promise<{[key: string]: any}> | {[key: string]: any}

export interface OptionsConfigItemOptions {
    sync: boolean
    schema: SchemaItem[]
    [key: string]: any
}

export interface OptionsConfigItem {
    type: ConfigType
    [key: string]: any
}

export interface Options {
    cwd?: string
    allowUnknown?: boolean
    removeUnknown?: boolean
    configs?: OptionsConfigItem[]
    schema?: SchemaItem[]
}

interface OptionsFinal {
    cwd: string
    sync: boolean
    allowUnknown: boolean
    removeUnknown: boolean
    configs: OptionsConfigItem[]
    schema: SchemaItem[]
}

const CONFIG_TYPE_METHODS: Record<ConfigType, ConfigTypeMethod> = {
    [ConfigType.ARG]: typeArg,
    [ConfigType.DEFAULT]: typeDefault,
    [ConfigType.DYNAMODB]: typeDynamodb,
    [ConfigType.ENV]: typeEnv,
    [ConfigType.JAVASCRIPT]: typeJavascript,
    [ConfigType.JSON]: typeJson,
    [ConfigType.JSON5]: typeJson5,
    [ConfigType.SECRET_MANAGER]: typeSecretManager,
}

function getType(type: ConfigType): ConfigTypeMethod {
    const method = CONFIG_TYPE_METHODS[type]
    if (!method) {
        throw new Error(`ConfigMan: Unknown config type '${type}'`)
    }

    return method
}

interface State {
    initialized: boolean
    promise: {
        resolve: (arg?: boolean) => any
        reject: (error?: Error) => any
    }
    config: {[key: string]: any}
}

export const STATE: State = {
    initialized: false,
    promise: {
        resolve: () => true,
        reject: () => false,
    },
    config: {},
}

export let ready = new Promise((resolve, reject) => {
    STATE.promise.resolve = resolve
    STATE.promise.reject = reject
})

export function reset(): void {
    STATE.initialized = false
    STATE.config = {}
    ready = new Promise((resolve, reject) => {
        STATE.promise.resolve = resolve
        STATE.promise.reject = reject
    })
}

export const get = <Config = any>(key: string): Config => {
    if (!STATE.initialized) {
        throw new Error('ConfigMan: Not initialised')
    }
    const value = key
        .split('.')
        .reduce<any>((a, b) => (typeof a === 'object' ? a[b] : undefined), STATE.config)

    if (value === undefined) {
        throw new Error(`ConfigMan: key '${key}' not found`)
    }

    return JSON.parse(JSON.stringify(value))
}

export async function init(o: Options): Promise<void> {
    return _init({...o, sync: false})
}

export function initSync(o: Options): void {
    return _init({...o, sync: true}) as void
}

function _init(o: Options & {sync: boolean}): Promise<void> | void {
    if (STATE.initialized) {
        throw new Error('ConfigMan: Already initialised')
    } else if (!fs.existsSync(path.join(o.cwd || __dirname, 'config-man.json'))) {
        throw new Error('ConfigMan: You need to add a config-man.json file to your project root.')
    }

    let schema
    try {
        const schemaRaw = fs
            .readFileSync(path.join(o.cwd || __dirname, 'config-man.json'))
            .toString('utf8')
        schema = JSON.parse(schemaRaw).schema
    } catch (error) {
        throw new Error(`ConfigMan: schema load error: ${(error as Error).message}`)
    }

    const options: OptionsFinal = {
        cwd: o.cwd || __dirname,
        sync: !!o.sync,
        allowUnknown: !!o.allowUnknown,
        removeUnknown: !!o.removeUnknown,
        configs: [...(o.configs || [])],
        schema,
    }

    if (options.sync) {
        return syncInit(options)
    } else {
        return asyncInit(options)
    }
}

function syncInit(options: OptionsFinal) {
    let config: {[key: string]: any} = {}
    for (const configItem of options.configs) {
        const typeMethod = getType(configItem.type)

        const newConfig = typeMethod({
            ...configItem,
            sync: options.sync,
            cwd: options.cwd,
            schema: options.schema,
        })
        config = {
            ...config,
            ...newConfig,
        }
    }

    const result = getErrors(options, config)

    if (result.errors.length) {
        throw new Error(`ConfigMan: invalid config: ${result.errors.join('; ')}`)
    }

    STATE.config = unflatten(result.config)
    STATE.initialized = true
    STATE.promise.resolve(true)
    return
}

async function asyncInit(options: OptionsFinal) {
    let config: {[key: string]: any} = {}
    for (const configItem of options.configs) {
        const typeMethod = getType(configItem.type)
        const newConfig = await typeMethod({
            ...configItem,
            sync: options.sync,
            cwd: options.cwd,
            schema: options.schema,
        })
        config = {
            ...config,
            ...newConfig,
        }
    }

    const result = getErrors(options, config)

    if (result.errors.length) {
        throw new Error(`ConfigMan: invalid config: ${result.errors.join('; ')}`)
    }

    STATE.config = unflatten(result.config)
    STATE.initialized = true
    STATE.promise.resolve(true)
}

function getErrors(
    options: OptionsFinal,
    config: {[key: string]: any},
): {errors: string[]; config: {[key: string]: any}} {
    const errors: string[] = []
    const newConfig: {[key: string]: any} = {}

    Object.keys(config).forEach((key: string) => {
        if (!options.allowUnknown && !options.schema.find((s) => s.key === key)) {
            errors.push(`(${key}) of type <${realTypeOf(config[key])}> is unknown`)
        } else if (options.removeUnknown && !options.schema.find((s) => s.key === key)) {
            // Nothing
        } else {
            newConfig[key] = config[key]
        }
    })

    options.schema.forEach((schemaItem) => {
        const value = config[schemaItem.key]
        const type = realTypeOf(value)
        if (!schemaItem.nullable && value === null) {
            errors.push(`(${schemaItem.key}) is not nullable`)
        } else if (schemaItem.nullable && value === null) {
            // Nothing
        } else if (type !== schemaItem.type) {
            errors.push(
                `(${schemaItem.key}) invalid type. Expected <${schemaItem.type}> got <${type}>`,
            )
        } else if (schemaItem.allowed && !schemaItem.allowed.includes(value)) {
            errors.push(
                `(${schemaItem.key}) value not allowed. Expected one of [${schemaItem.allowed.join(
                    ', ',
                )}] got ${value}`,
            )
        }
    })

    return {errors, config: newConfig}
}
