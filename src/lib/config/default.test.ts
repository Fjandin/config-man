import typeDefault from './default'

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

describe('Config type default', () => {
    it('should get config', async () => {
        const result = await typeDefault({sync: false, schema: configManJson.schema})
        expect(result).toEqual({test3: 1, test4: false})
    })

    it('should get config (sync)', async () => {
        const result = typeDefault({sync: true, schema: configManJson.schema})
        expect(result).toEqual({test3: 1, test4: false})
    })
})
