import typeArg from 'lib/config/arg'
import * as chai from 'chai'

const configManJson = require('configManJson')

describe('Config type arg', () => {
    it('should get config', async () => {
        const result = await typeArg({sync: false, schema: configManJson.schema})
        chai.expect(result).to.deep.equal({test3: 2, test10: '666'})
    })
})
