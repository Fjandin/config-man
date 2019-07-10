import * as chai from 'chai'
import typeEnv from 'lib/config/env'

const configManJson = require('configManJson')

describe('Config type evnironment vars', () => {
    it('should get config', async () => {
        const result = await typeEnv({sync: false, schema: configManJson.schema})
        chai.expect(result).to.deep.equal({'test1.test1a': 'env', 'env.unknown': 'test'})
    })

    it('should get config (sync)', async () => {
        const result = typeEnv({sync: true, schema: configManJson.schema})
        chai.expect(result).to.deep.equal({'test1.test1a': 'env', 'env.unknown': 'test'})
    })
})
