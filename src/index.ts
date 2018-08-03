import {unflatten} from 'flat'
import * as path from 'path'
import * as fs from 'fs'
import {realTypeOf} from 'lib/helpers'

import typeArg from 'lib/config/arg'
import typeDefault from 'lib/config/default'
import typeDynamodb from 'lib/config/dynamodb'
import typeEnv from 'lib/config/env'
import typeJson from 'lib/config/json'

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
    JSON = 'json'
}

export type ConfigTypeMethod = (
    options: OptionsConfigItemOptions
) => Promise<{[key: string]: any}> | {[key: string]: any}

export interface OptionsConfigItemOptions {
    sync: boolean
    schema: SchemaItem[]
    [key: string]: any
}

export interface OptionsConfigItem {
    type: ConfigType
    options: OptionsConfigItemOptions
}

export interface Options {
    cwd?: string
    sync?: boolean
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

function getType(type: ConfigType): ConfigTypeMethod {
    switch (type) {
        case ConfigType.ARG:
            return typeArg
        case ConfigType.DEFAULT:
            return typeDefault
        case ConfigType.DYNAMODB:
            return typeDynamodb
        case ConfigType.ENV:
            return typeEnv
        case ConfigType.JSON:
            return typeJson
        default:
            throw new Error(`ConfigMan: Unknown config type '${type}'`)
    }
}

interface State {
    initialized: boolean
    promise: {
        resolve: (arg?: boolean) => any
        reject: (error?: Error) => any
    }
    config: {[key: string]: any}
}

const STATE: State = {
    initialized: false,
    promise: {
        resolve: () => true,
        reject: () => false
    },
    config: {}
}

export const ready = new Promise((resolve, reject) => {
    STATE.promise.resolve = resolve
    STATE.promise.reject = reject
})

export async function init(o: Options): Promise<void> {
    try {
        return await _init(o)
    } catch (error) {
        STATE.promise.reject(error)
    }
}

async function _init(o: Options): Promise<void> {
    if (STATE.initialized) {
        throw new Error('ConfigMan: Already initialised')
    } else if (!fs.existsSync(path.join(o.cwd || __dirname, 'config-man.json'))) {
        throw new Error('CONFIG-MAN: You need to add a config-man.json file to your project root.')
    }

    const options: OptionsFinal = {
        cwd: o.cwd || __dirname,
        sync: !!o.sync,
        allowUnknown: !!o.allowUnknown,
        removeUnknown: !!o.removeUnknown,
        configs: [...(o.configs || [])],
        schema: require(path.join(o.cwd || __dirname, 'config-man.json')).schema
    }

    let errors: string[] = []
    let config: {[key: string]: any} = {}
    const checkErrors = (dataItem: OptionsConfigItem, dataConfig: {[key: string]: any}) => (
        a: any[],
        key: string
    ) => {
        if (!options.schema.find((option) => option.key === key)) {
            if (options.removeUnknown) {
                const {[key]: _omit, ...rest} = config
                config = rest
            } else if (!options.allowUnknown) {
                return [
                    ...a,
                    `(${key}) of type <${realTypeOf(dataConfig[key])}> from (${
                        dataItem.type
                    }) is unknown`
                ]
            }
        }
        return a
    }
    for (let configItem of options.configs) {
        const typeMethod = getType(configItem.type)

        const result = typeMethod({
            ...configItem,
            sync: options.sync,
            cwd: options.cwd,
            schema: options.schema
        })

        const newConfig = options.sync ? result : await result

        errors = Object.keys(newConfig).reduce(checkErrors(configItem, newConfig), errors)
        config = {
            ...config,
            ...newConfig
        }
    }

    errors = options.schema.reduce((a, option) => {
        const value = config[option.key]
        const type = realTypeOf(value)
        if (option.nullable && value === null) {
            return a
        } else if (!option.nullable && value === null) {
            return [...a, `(${option.key}) is not nullable`]
        } else if (type !== option.type) {
            return [...a, `(${option.key}) invalid type. Expected <${option.type}> got <${type}>`]
        } else if (option.allowed && !option.allowed.includes(value)) {
            return [
                ...a,
                `(${option.key}) value not allowed. Expected one of [${option.allowed.join(
                    ', '
                )}] got ${value}`
            ]
        }
        return a
    }, errors)

    if (errors.length) {
        throw new Error(`ConfigMan: invalid config\n${errors.join('\n')}`)
    }

    STATE.config = unflatten(config)
    STATE.initialized = true
    STATE.promise.resolve(true)
}
