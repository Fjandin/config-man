import typeJavascript from './javascript'
import * as path from 'path'

const configManJavascript = {
    schema: [
        {key: 'test1.test1a', type: 'string'},
        {key: 'test1.test1b', type: 'number'},
        {key: 'test1.test1c', type: 'string', nullable: true},
        {key: 'test2', type: 'string', allowed: ['1', '2', '3']},
        {key: 'test3', type: 'number', default: 1, allowed: [1, 2, 3]},
        {key: 'test4', type: 'boolean', default: false}
    ]
}

describe('Config type Json', () => {
    it('should get config', async () => {
        const result = await typeJavascript({
            sync: false,
            schema: configManJavascript.schema,
            filePath: path.resolve(__dirname, 'javascript.test-input.ts')
        })
        expect(result).toEqual({
            'test1.test1a': 'test',
            'test1.test1b': 12345,
            'test1.test1c': null,
            test2: '2',
            test3: 3,
            test11: 11
        })
    })
})
