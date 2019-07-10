import * as chai from 'chai'
import typeDefault from 'lib/config/default'

const configManJson = require('configManJson')

describe('Config type default', () => {
    it('should get config', async () => {
        const result = await typeDefault({sync: false, schema: configManJson.schema})
        chai.expect(result).to.deep.equal({test3: 1, test4: false})
    })

    it('should get config (sync)', async () => {
        const result = typeDefault({sync: true, schema: configManJson.schema})
        chai.expect(result).to.deep.equal({test3: 1, test4: false})
    })
})
