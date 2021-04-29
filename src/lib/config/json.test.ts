import typeJson from './json'
import * as path from 'path'

const configManJson = {
    schema: [
        {key: 'test1.test1a', type: 'string'},
        {key: 'test1.test1b', type: 'number'},
        {key: 'test1.test1c', type: 'string', nullable: true},
        {key: 'test2', type: 'string', allowed: ['1', '2', '3']},
        {key: 'test3', type: 'number', default: 1, allowed: [1, 2, 3]},
        {key: 'test4', type: 'boolean', default: false},
    ],
}

describe('Config type Json', () => {
    it('should get config', async () => {
        const result = await typeJson({
            sync: false,
            schema: configManJson.schema,
            filePath: path.resolve(__dirname, 'json.test.json'),
        })
        expect(result).toEqual({
            'test1.test1a': 'test',
            'test1.test1b': 12345,
            'test1.test1c': null,
            test2: '2',
            test3: 3,
            test11: 11,
        })
    })

    it('should get config (sync)', async () => {
        const result = typeJson({
            sync: true,
            schema: configManJson.schema,
            filePath: path.resolve(__dirname, 'json.test.json'),
        })
        expect(result).toEqual({
            'test1.test1a': 'test',
            'test1.test1b': 12345,
            'test1.test1c': null,
            test2: '2',
            test3: 3,
            test11: 11,
        })
    })
})
