import * as flatten from 'flat'

import {OptionsConfigItemOptions} from './../../index'

export default async function getConfigJson(
    options: OptionsConfigItemOptions
): Promise<{[key: string]: any}> {
    if (options.sync) {
        throw new Error('This type does not support sync')
    }

    const content = await import(options.filePath)
    return flatten<any, any>(content)
}
