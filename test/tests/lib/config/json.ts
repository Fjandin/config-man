import * as chai from 'chai'
import typeJson from 'lib/config/json'
import * as path from 'path'

const configManJson = require('configManJson')

describe('Config type Json', () => {
    it('should get config', async () => {
        const result = await typeJson({
            sync: false,
            schema: configManJson.schema,
            filePath: path.resolve(__dirname, '../../../mock/config.json')
        })
        chai.expect(result).to.deep.equal({
            'test1.test1a': 'test',
            'test1.test1b': 12345,
            'test1.test1c': null,
            test2: '2',
            test3: 3,
            test11: 11
        })
    })

    it('should get config (sync)', async () => {
        const result = typeJson({
            sync: true,
            schema: configManJson.schema,
            filePath: path.resolve(__dirname, '../../../mock/config.json')
        })
        chai.expect(result).to.deep.equal({
            'test1.test1a': 'test',
            'test1.test1b': 12345,
            'test1.test1c': null,
            test2: '2',
            test3: 3,
            test11: 11
        })
    })
})
