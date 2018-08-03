const mockRequire = require('mock-require')
mockRequire('aws-sdk', require('./../../../mock/aws-sdk'))

import typeDynamodb from 'lib/config/dynamodb'
import * as chai from 'chai'

const configManJson = require('configManJson')

describe('Config type dynamo db', () => {
    it('should get config', async () => {
        const result = await typeDynamodb({
            sync: false,
            schema: configManJson.schema,
            tableName: 'Test',
            region: 'eu-west-1'
        })
        chai.expect(result).to.deep.equal({'test1.test1b': 123, 'db.unknown': 'dynamo'})
    })
})
