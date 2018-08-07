import {OptionsConfigItemOptions} from './../../index'

export default function getConfigDefault(
    options: OptionsConfigItemOptions
): Promise<{[key: string]: any}> | {[key: string]: any} {
    const schema = options.schema
    const result = schema.reduce((a, option) => {
        if (option.default !== undefined) {
            return {...a, [option.key]: option.default}
        }
        return a
    }, {})
    return options.sync ? result : Promise.resolve(result)
}
