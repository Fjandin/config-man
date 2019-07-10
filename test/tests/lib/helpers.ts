import * as chai from 'chai'
import * as helpers from 'lib/helpers'

describe('Helpers', () => {
    context('realTypeOf', () => {
        it('should show real type of var', () => {
            chai.expect(helpers.realTypeOf(undefined)).to.equal('undefined')
            chai.expect(helpers.realTypeOf('undefined')).to.equal('string')
            chai.expect(helpers.realTypeOf(1234)).to.equal('number')
            chai.expect(helpers.realTypeOf({})).to.equal('object')
            chai.expect(helpers.realTypeOf([])).to.equal('array')
            chai.expect(helpers.realTypeOf(/test/)).to.equal('regexp')
            chai.expect(helpers.realTypeOf(new Date())).to.equal('date')
            chai.expect(helpers.realTypeOf(null)).to.equal('null')
        })
    })

    context('toBoolean', () => {
        it('should parse boolean (boolean -> boolean)', () => {
            chai.expect(helpers.toBoolean(false)).to.be.false
            chai.expect(helpers.toBoolean(true)).to.be.true
        })
        it('should parse boolean (string -> false)', () => {
            chai.expect(helpers.toBoolean('0')).to.be.false
            chai.expect(helpers.toBoolean('false')).to.be.false
            chai.expect(helpers.toBoolean('FALSE')).to.be.false
            chai.expect(helpers.toBoolean('False')).to.be.false
        })
        it('should parse boolean (string -> true)', () => {
            chai.expect(helpers.toBoolean('1')).to.be.true
            chai.expect(helpers.toBoolean('true')).to.be.true
            chai.expect(helpers.toBoolean('TRUE')).to.be.true
            chai.expect(helpers.toBoolean('True')).to.be.true
        })
        it('should parse boolean (number -> false)', () => {
            chai.expect(helpers.toBoolean(0)).to.be.false
        })
        it('should parse boolean (number -> true)', () => {
            chai.expect(helpers.toBoolean(1)).to.be.true
        })
        it('should parse invalid values to false', () => {
            chai.expect(helpers.toBoolean(-1)).to.be.false
            chai.expect(helpers.toBoolean(2)).to.be.false
            chai.expect(helpers.toBoolean('X')).to.be.false
            chai.expect(helpers.toBoolean(undefined)).to.be.false
            chai.expect(helpers.toBoolean(new Date())).to.be.false
        })
    })

    context('parseValue', () => {
        it('should parse number', () => {
            chai.expect(helpers.parseValue({type: 'number'}, '12345')).to.equal(12345)
        })
        it('should parse boolean', () => {
            chai.expect(helpers.parseValue({type: 'boolean'}, 1)).to.be.true
            chai.expect(helpers.parseValue({type: 'boolean'}, 0)).to.be.false
        })
        it('should handle null', () => {
            chai.expect(helpers.parseValue({type: 'string'}, 'null')).to.be.null
        })
    })
})
