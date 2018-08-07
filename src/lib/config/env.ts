import {parseValue} from './../helpers'
import {OptionsConfigItemOptions} from './../../index'

export default function getConfigEnv(
    options: OptionsConfigItemOptions
): Promise<{[key: string]: any}> | {[key: string]: any} {
    const schema = options.schema
    const prefix = options.prefix || 'CM_'
    const seperator = options.seperator || '_'
    const env = Object.keys(process.env).map((key) => ({key, value: process.env[key]}))
    const args: {[key: string]: any} = env.reduce((a: {[key: string]: any}, b) => {
        if (b.key.startsWith(prefix)) {
            const key = b.key.replace(prefix, '').replace(new RegExp(seperator, 'g'), '.')
            const value = b.value
            if (key && value) {
                return {...a, [key]: value}
            }
        }
        return a
    }, {})

    const result = schema.reduce((a: {[key: string]: any}, schemaItem) => {
        if (args[schemaItem.key]) {
            return {
                ...a,
                [schemaItem.key]: parseValue(schemaItem, args[schemaItem.key])
            }
        }
        return a
    }, args)

    return options.sync ? result : Promise.resolve(result)
}
