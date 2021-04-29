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

const awsSdk = {
    config: {
        update: () => null,
    },
    DynamoDB: {
        DocumentClient: documentClient,
    },
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function documentClient() {}
documentClient.prototype.scan = (_params: any, callback: any) => {
    callback(null, {
        Items: [
            {key: 'test3', value: 2},
            {key: 'db.unknown', value: 'dynamo'},
        ],
    })
}

jest.mock('aws-sdk', () => awsSdk)

import typeDynamodb from './dynamodb'

describe('Config type dynamo db', () => {
    afterAll(() => {
        jest.unmock('aws-sdk')
    })

    it('should get config', async () => {
        const result = await typeDynamodb({
            sync: false,
            schema: configManJson.schema,
            tableName: 'Test',
            region: 'eu-west-1',
        })
        expect(result).toEqual({test3: 2, 'db.unknown': 'dynamo'})
    })

    it('should not handle sync (not supported)', async () => {
        const result = () =>
            typeDynamodb({
                sync: true,
                schema: configManJson.schema,
                tableName: 'Test',
                region: 'eu-west-1',
            })
        expect(result).toThrow('This type does not support sync')
    })
})
