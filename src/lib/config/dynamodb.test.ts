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

const mockScanCommand = jest.fn()
// eslint-disable-next-line @typescript-eslint/naming-convention
const mockDynamoDBClientSend = jest.fn().mockResolvedValue({
    Items: [{test3: 2}, {'db.unknown': 'dynamo'}],
})

jest.mock('@aws-sdk/client-dynamodb', () => ({
    ScanCommand: mockScanCommand,
    DynamoDBClient: class MockedDynamoDBClient {
        public send = mockDynamoDBClientSend
    },
}))

import typeDynamodb from './dynamodb'

describe('Config type dynamo db', () => {
    afterAll(() => {
        jest.unmock('@aws-sdk/client-dynamodb')
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
        const funcToThrow = async () =>
            await typeDynamodb({
                sync: true,
                schema: configManJson.schema,
                tableName: 'Test',
                region: 'eu-west-1',
            })
        await expect(funcToThrow()).rejects.toThrow('This type does not support sync')
    })
})
