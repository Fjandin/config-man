import typeDefault from 'lib/config/default'
import * as chai from 'chai'

const configManJson = require('configManJson')

describe('Config type default', () => {
    it('should get config', async () => {
        const result = await typeDefault({sync: false, schema: configManJson.schema})
        chai.expect(result).to.deep.equal({test3: 1, test4: false})
    })
})
