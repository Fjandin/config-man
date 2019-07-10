import * as chai from 'chai'
import typeArg from 'lib/config/arg'

const configManJson = require('configManJson')

describe('Config type arg', () => {
    it('should get config', async () => {
        const result = await typeArg({sync: false, schema: configManJson.schema})
        chai.expect(result).to.deep.equal({test3: 2, test10: '666'})
    })

    it('should get config (sync)', async () => {
        const result = typeArg({sync: true, schema: configManJson.schema})
        chai.expect(result).to.deep.equal({test3: 2, test10: '666'})
    })
})
