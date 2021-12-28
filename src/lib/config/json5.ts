import * as flatten from 'flat'
import * as fs from 'fs'
import * as json5 from 'json5'
import {promisify} from 'util'

import {OptionsConfigItemOptions} from './../../index'

const readFileAsync = promisify(fs.readFile)

function stringToFlattened(input: string): Record<string, any> {
    return flatten<any, any>(json5.parse(input))
}

export default function getConfigJson(
    options: OptionsConfigItemOptions,
): Promise<Record<string, any>> | Record<string, any> {
    if (options.sync) {
        return stringToFlattened(fs.readFileSync(options.filePath, 'utf8'))
    }

    return readFileAsync(options.filePath, 'utf8').then(stringToFlattened)
}
