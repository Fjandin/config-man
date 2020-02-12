import * as configMan from './'
import * as path from 'path'

describe('Init', () => {
    beforeEach(() => {
        configMan.reset()
    })

    describe('async', () => {
        it('should initialize', async () => {
            const init: any = configMan.init({
                cwd: path.resolve(__dirname),
                allowUnknown: true,
                removeUnknown: true,
                configs: [
                    {type: configMan.ConfigType.DEFAULT},
                    {
                        type: configMan.ConfigType.JSON,
                        filePath: path.resolve(__dirname, 'index.test.json')
                    }
                ]
            })
            expect(init.then).not.toBe(undefined)
            expect(configMan.STATE.initialized).toBe(false)
            await init
            expect(configMan.STATE.initialized).toBe(true)
            expect(configMan.STATE.config).toEqual({
                test1: {
                    test1a: 'test',
                    test1b: 12345,
                    test1c: null
                },
                test2: '2',
                test3: 3,
                test4: false
            })
        })
    })

    describe('check', () => {
        it('should fail on unknown', async () => {
            const cm = () =>
                configMan.init({
                    cwd: path.resolve(__dirname),
                    allowUnknown: false,
                    configs: [
                        {type: configMan.ConfigType.DEFAULT},
                        {
                            type: configMan.ConfigType.JSON,
                            filePath: path.resolve(__dirname, 'index.test.json')
                        }
                    ]
                })
            await expect(cm()).rejects.toThrow(
                'ConfigMan: invalid config: (test11) of type <number> is unknown'
            )
        })
    })

    describe('check 2', () => {
        it('should fail on no configMan Schema', async () => {
            const cm = () =>
                configMan.init({
                    cwd: path.resolve(__dirname, 'lib'),
                    configs: [
                        {type: configMan.ConfigType.DEFAULT},
                        {
                            type: configMan.ConfigType.JSON,
                            filePath: path.resolve(__dirname, 'index.test.json')
                        }
                    ]
                })

            await expect(cm()).rejects.toThrow(
                'ConfigMan: You need to add a config-man.json file to your project root'
            )
        })
    })

    describe('sync', () => {
        it('should initialize', async () => {
            const init: any = configMan.initSync({
                cwd: path.resolve(__dirname),
                allowUnknown: true,
                removeUnknown: true,
                configs: [
                    {type: configMan.ConfigType.DEFAULT},
                    {
                        type: configMan.ConfigType.JSON,
                        filePath: path.resolve(__dirname, 'index.test.json')
                    }
                ]
            })
            expect(init).toBe(undefined)
            expect(configMan.STATE.initialized).toBe(true)
            expect(configMan.STATE.config).toEqual({
                test1: {
                    test1a: 'test',
                    test1b: 12345,
                    test1c: null
                },
                test2: '2',
                test3: 3,
                test4: false
            })
        })
    })
})
