/* eslint-disable no-console */

/**
 * This script checks whether the defined configuration files contain all mandatory configuration items.
 *
 * Configuration items are expected to be present if ...
 * 1) they have no `default` property in the config man schema file, and
 * 2) they have no `"inJson": false` property in the config man schema file, and
 * 3) they have no value in the configuration file.
 */

import * as fs from 'fs'
import * as path from 'path'
import {exit} from 'process'

import * as flatten from 'flat'
import * as json5 from 'json5'

enum ExitCode {
    SUCCESS = 0,
    UNEXPECTED_ERROR = 1,
    MISSING_ITEMS = 2,
}

interface SchemaItem {
    key: string
    type: string
    allowed?: any[]
    default?: any
    nullable?: boolean

    // added to allow us to exclude items that explicitly come from elsewhere
    inJson?: boolean
}

function main(schemaPath: string, schemaFilenames: string[]): string[] {
    const schema = loadSchema(schemaPath)
    const configFiles = schemaFilenames.map((it) => loadConfig(it))

    return configFiles.reduce((missing, config, index) => {
        const fileName = schemaFilenames[index]
        const missingKeys = getConfigMissingKeys(config, schema)

        if (missingKeys.length) {
            missing.push(`'${fileName}' is missing configuration keys: ${missingKeys}`)
        }

        return missing
    }, [] as string[])
}

try {
    const args = process.argv.slice(2)

    const schemaPath = args[0]
    const schemaFilenames = args[1].split(',')
    const missing = main(schemaPath, schemaFilenames)

    if (missing.length) {
        console.log(missing.join('\n'))
        exit(ExitCode.MISSING_ITEMS)
    } else {
        exit(ExitCode.SUCCESS)
    }
} catch (err: any) {
    console.error(
        `Got an unexpected error trying to find missing configuration items: ${err.message}`,
        err.stack,
    )
    exit(ExitCode.UNEXPECTED_ERROR)
}

function getConfigMissingKeys(config: Record<string, any>, schema: SchemaItem[]): string[] {
    return schema
        .filter(
            // `default` is a reserved word, so we must rename
            ({key, default: defaultValue}) =>
                config[key] === undefined && defaultValue === undefined,
        )
        .map((it) => it.key)
}

function loadSchema(relativePath: string): SchemaItem[] {
    const items: SchemaItem[] = loadJson(relativePath).schema
    return items.filter(({inJson}) => inJson !== false)
}

function loadConfig(relativePath: string): Promise<Record<string, any>> {
    const untyped = loadJson(relativePath)
    return flatten(untyped)
}

function loadJson(relativePath: string): any {
    const filePath = path.resolve(relativePath)

    try {
        const schemaRaw = fs.readFileSync(filePath, {encoding: 'utf-8'})
        return json5.parse(schemaRaw)
    } catch (error) {
        throw new Error(`schema load error in '${relativePath}': ${(error as Error).message}`)
    }
}
