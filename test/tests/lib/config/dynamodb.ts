import * as chai from 'chai'
import typeDynamodb from 'lib/config/dynamodb'

const configManJson = require('configManJson')

describe('Config type dynamo db', () => {
    it('should get config', async () => {
        const result = await typeDynamodb({
            sync: false,
            schema: configManJson.schema,
            tableName: 'Test',
            region: 'eu-west-1'
        })
        chai.expect(result).to.deep.equal({test3: 2, 'db.unknown': 'dynamo'})
    })

    it('should not handle sync (not supported)', async () => {
        const result = () =>
            typeDynamodb({
                sync: true,
                schema: configManJson.schema,
                tableName: 'Test',
                region: 'eu-west-1'
            })
        chai.expect(result).to.throw('This type does not support sync')
    })
})
