import * as flatten from 'flat'
import * as fs from 'fs'
import * as json5 from 'json5'
import {promisify} from 'util'

import {OptionsConfigItemOptions} from './../../index'

const readFileAsync = promisify(fs.readFile)

export default function getConfigJson(
    options: OptionsConfigItemOptions,
): Promise<{[key: string]: any}> | {[key: string]: any} {
    if (options.sync) {
        const content = fs.readFileSync(options.filePath, 'utf8')
        return flatten<any, any>(json5.parse(content))
    }

    return readFileAsync(options.filePath, 'utf8').then((content) =>
        flatten<any, any>(json5.parse(content)),
    )
}
