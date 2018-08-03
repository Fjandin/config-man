// Setup module search paths to root. Makes it possible to require modules relative to project root
const rootPath = (process.env.NODE_PATH = process.cwd() + '/src')
require('module').Module._initPaths()

const mockRequire = require('mock-require')
const chai = require('chai')
chai.use(require('sinon-chai'))
chai.use(require('chai-as-promised'))
chai.use(require('chai-datetime'))
chai.should()

mockRequire('aws-sdk', require('./mock/aws-sdk'))
mockRequire('configManJson', require('./mock/config-man.json'))
