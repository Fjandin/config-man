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

const mockSecretsManagerClientSend = jest.fn()
const mockGetSecretValueCommand = jest.fn()

jest.mock('@aws-sdk/client-secrets-manager', () => ({
    GetSecretValueCommand: mockGetSecretValueCommand,
    SecretsManagerClient: class MockedSecretsManagerClient {
        public send = mockSecretsManagerClientSend
    },
}))

import typeSecretManager from './secret-manager'

describe('Config type secret manager', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should get config (boolean and number)', async () => {
        mockSecretsManagerClientSend.mockResolvedValue({
            SecretString: JSON.stringify({
                test4: 'true',
                test3: '1234',
                unknown: 'false',
            }),
        })
        const result = await typeSecretManager({
            sync: false,
            schema: configManJson.schema,
            secretName: 'Test',
            region: 'eu-west-1',
        })
        expect(result).toEqual({test4: true, test3: 1234, unknown: 'false'})
    })

    it('should get config (text)', async () => {
        mockSecretsManagerClientSend.mockResolvedValue({
            SecretString: JSON.stringify({
                'test1.test1a': 'foo',
                test3: 1,
            }),
        })
        const result = await typeSecretManager({
            sync: false,
            schema: configManJson.schema,
            secretName: 'Test',
            region: 'eu-west-1',
        })
        expect(result).toEqual({'test1.test1a': 'foo', test3: 1})
    })

    it('should get config (binary)', async () => {
        const config = JSON.stringify({'test1.test1a': 'foo', test3: 1})
        const configBuffer = Buffer.from(config).toString('base64')

        mockSecretsManagerClientSend.mockResolvedValue({
            SecretBinary: configBuffer,
        })
        const result = await typeSecretManager({
            sync: false,
            schema: configManJson.schema,
            secretName: 'Test',
            region: 'eu-west-1',
        })
        expect(result).toEqual({'test1.test1a': 'foo', test3: 1})
    })

    it('should reject if config is empty', async () => {
        mockSecretsManagerClientSend.mockResolvedValue({
            SecretString: undefined,
        })
        await expect(
            typeSecretManager({
                sync: false,
                schema: configManJson.schema,
                secretName: 'Test',
                region: 'eu-west-1',
            }),
        ).rejects.toThrow('No secrets returned')
    })

    it('should reject if config is malformed', async () => {
        mockSecretsManagerClientSend.mockResolvedValue({
            SecretString: '{{}',
        })
        await expect(
            typeSecretManager({
                sync: false,
                schema: configManJson.schema,
                secretName: 'Test',
                region: 'eu-west-1',
            }),
        ).rejects.toThrow()
    })
})
