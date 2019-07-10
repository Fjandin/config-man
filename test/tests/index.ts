import * as chai from 'chai'
import * as configMan from 'index'
import * as path from 'path'

describe('Init', () => {
    beforeEach(() => {
        configMan.reset()
    })

    context('async', () => {
        it('should initialize', async () => {
            const init: any = configMan.init({
                cwd: path.resolve(__dirname, '../mock'),
                allowUnknown: true,
                removeUnknown: true,
                configs: [
                    {type: configMan.ConfigType.DEFAULT},
                    {
                        type: configMan.ConfigType.JSON,
                        filePath: path.resolve(__dirname, '../mock/config.json')
                    }
                ]
            })
            chai.expect(init.then).to.not.be.undefined
            chai.expect(configMan.STATE.initialized).to.be.false
            await init
            chai.expect(configMan.STATE.initialized).to.be.true
            chai.expect(configMan.STATE.config).to.deep.equal({
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

    context('check', () => {
        it('should fail on unknown', async () => {
            await configMan
                .init({
                    cwd: path.resolve(__dirname, '../mock'),
                    allowUnknown: false,
                    configs: [
                        {type: configMan.ConfigType.DEFAULT},
                        {
                            type: configMan.ConfigType.JSON,
                            filePath: path.resolve(__dirname, '../mock/config.json')
                        }
                    ]
                })
                .should.eventually.be.rejectedWith(
                    'ConfigMan: invalid config\n(test11) of type <number> is unknown'
                )
        })
    })

    context('check 2', () => {
        it('should fail on no configMan Schema', async () => {
            await configMan
                .init({
                    cwd: path.resolve(__dirname, '../'),
                    configs: [
                        {type: configMan.ConfigType.DEFAULT},
                        {
                            type: configMan.ConfigType.JSON,
                            filePath: path.resolve(__dirname, '../mock/config.json')
                        }
                    ]
                })
                .should.eventually.be.rejectedWith(
                    'ConfigMan: You need to add a config-man.json file to your project root'
                )
        })
    })

    context('sync', () => {
        it('should initialize', async () => {
            const init: any = configMan.initSync({
                cwd: path.resolve(__dirname, '../mock'),
                allowUnknown: true,
                removeUnknown: true,
                configs: [
                    {type: configMan.ConfigType.DEFAULT},
                    {
                        type: configMan.ConfigType.JSON,
                        filePath: path.resolve(__dirname, '../mock/config.json')
                    }
                ]
            })
            chai.expect(init).to.be.undefined
            chai.expect(configMan.STATE.initialized).to.be.true
            chai.expect(configMan.STATE.config).to.deep.equal({
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
