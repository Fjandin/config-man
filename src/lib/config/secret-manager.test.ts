const configManJson = {
    schema: [
        {key: 'test1.test1a', type: 'string'},
        {key: 'test1.test1b', type: 'number'},
        {key: 'test1.test1c', type: 'string', nullable: true},
        {key: 'test2', type: 'string', allowed: ['1', '2', '3']},
        {key: 'test3', type: 'number', default: 1, allowed: [1, 2, 3]},
        {key: 'test4', type: 'boolean', default: false}
    ]
}

const mockGetSecretValue = jest.fn()
const mockConfigUpdate = jest.fn()
const mockAws = {
    config: {
        update: mockConfigUpdate
    },
    SecretsManager: class MockedSecretsManager {
        public getSecretValue = mockGetSecretValue
    }
}

jest.mock('aws-sdk', () => mockAws)

import typeSecretManager from './secret-manager'

describe('Config type secret manager', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should get config (text)', async () => {
        mockGetSecretValue.mockImplementation((_params: any, callback: any) =>
            callback(null, {
                SecretString: JSON.stringify({
                    'test1.test1a': 'foo',
                    test3: 1
                })
            })
        )
        const result = await typeSecretManager({
            sync: false,
            schema: configManJson.schema,
            secretName: 'Test',
            region: 'eu-west-1'
        })
        expect(result).toEqual({'test1.test1a': 'foo', test3: 1})
    })

    it('should get config (binary)', async () => {
        const config = JSON.stringify({'test1.test1a': 'foo', test3: 1})
        const configBuffer = Buffer.from(config).toString('base64')

        mockGetSecretValue.mockImplementation((_params: any, callback: any) =>
            callback(null, {
                SecretBinary: configBuffer
            })
        )
        const result = await typeSecretManager({
            sync: false,
            schema: configManJson.schema,
            secretName: 'Test',
            region: 'eu-west-1'
        })
        expect(result).toEqual({'test1.test1a': 'foo', test3: 1})
    })

    it('should reject if config is empty', async () => {
        mockGetSecretValue.mockImplementation((_params: any, callback: any) =>
            callback(null, {
                SecretString: undefined
            })
        )
        await expect(
            typeSecretManager({
                sync: false,
                schema: configManJson.schema,
                secretName: 'Test',
                region: 'eu-west-1'
            })
        ).rejects.toThrow('No secrets returned')
    })

    it('should reject if config is malformed', async () => {
        mockGetSecretValue.mockImplementation((_params: any, callback: any) =>
            callback(null, {
                SecretString: '{{}'
            })
        )
        await expect(
            typeSecretManager({
                sync: false,
                schema: configManJson.schema,
                secretName: 'Test',
                region: 'eu-west-1'
            })
        ).rejects.toThrow('Unexpected token { in JSON at position 1')
    })
})
