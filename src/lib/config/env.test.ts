import typeEnv from './env'

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

describe('Config type evnironment vars', () => {
    beforeAll(() => {
        process.env.CM_test1_test1a = 'env'
        process.env.CM_env_unknown = 'test'
    })

    afterAll(() => {
        process.env.CM_test1_test1a = ''
        process.env.CM_env_unknown = ''
    })

    it('should get config', async () => {
        const result = await typeEnv({sync: false, schema: configManJson.schema})
        expect(result).toEqual({'test1.test1a': 'env', 'env.unknown': 'test'})
    })

    it('should get config (sync)', async () => {
        const result = typeEnv({sync: true, schema: configManJson.schema})
        expect(result).toEqual({'test1.test1a': 'env', 'env.unknown': 'test'})
    })
})
