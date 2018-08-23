import * as flatten from 'flat'
import * as fs from 'fs'

import {OptionsConfigItemOptions} from './../../index'

export default function getConfigJson(
    options: OptionsConfigItemOptions
): Promise<{[key: string]: any}> | {[key: string]: any} {
    let content = fs.readFileSync(options.filePath, 'utf8')
    const result = flatten(JSON.parse(content))
    return options.sync ? result : Promise.resolve(result)
}
