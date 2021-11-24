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
        process.env.CM_test4 = 'true'
        process.env.CM_test1_test1b = '1234'
    })

    afterAll(() => {
        process.env.CM_test1_test1a = ''
        process.env.CM_env_unknown = ''
        process.env.CM_test4 = ''
        process.env.CM_test1_test1b = ''
    })

    it('should get config', async () => {
        const result = await typeEnv({sync: false, schema: configManJson.schema})
        expect(result).toEqual({
            'test1.test1a': 'env',
            'env.unknown': 'test',
            test4: true,
            'test1.test1b': 1234,
        })
    })

    it('should get config (sync)', async () => {
        const result = typeEnv({sync: true, schema: configManJson.schema})
        expect(result).toEqual({
            'test1.test1a': 'env',
            'env.unknown': 'test',
            test4: true,
            'test1.test1b': 1234,
        })
    })
})
