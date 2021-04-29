import typeArg from './arg'

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

describe('Config type arg', () => {
    let backup: string[]

    beforeAll(() => {
        backup = process.argv
        process.argv = ['somebin', '--cm', 'test3=2', '--cm', 'test10=666']
    })

    afterAll(() => {
        process.argv = backup
    })

    it('should get config', async () => {
        const result = await typeArg({sync: false, schema: configManJson.schema})
        expect(result).toEqual({test3: 2, test10: '666'})
    })

    it('should get config (sync)', async () => {
        const result = typeArg({sync: true, schema: configManJson.schema})
        expect(result).toEqual({test3: 2, test10: '666'})
    })
})
