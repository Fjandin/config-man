import * as helpers from './helpers'

describe('Helpers', () => {
    describe('realTypeOf', () => {
        it('should show real type of var', () => {
            expect(helpers.realTypeOf(undefined)).toEqual('undefined')
            expect(helpers.realTypeOf('undefined')).toEqual('string')
            expect(helpers.realTypeOf(1234)).toEqual('number')
            expect(helpers.realTypeOf({})).toEqual('object')
            expect(helpers.realTypeOf([])).toEqual('array')
            expect(helpers.realTypeOf(/test/)).toEqual('regexp')
            expect(helpers.realTypeOf(new Date())).toEqual('date')
            expect(helpers.realTypeOf(null)).toEqual('null')
        })
    })

    describe('toBoolean', () => {
        it('should parse boolean (boolean -> boolean)', () => {
            expect(helpers.toBoolean(false)).toBe(false)
            expect(helpers.toBoolean(true)).toBe(true)
        })
        it('should parse boolean (string -> false)', () => {
            expect(helpers.toBoolean('0')).toBe(false)
            expect(helpers.toBoolean('false')).toBe(false)
            expect(helpers.toBoolean('FALSE')).toBe(false)
            expect(helpers.toBoolean('False')).toBe(false)
        })
        it('should parse boolean (string -> true)', () => {
            expect(helpers.toBoolean('1')).toBe(true)
            expect(helpers.toBoolean('true')).toBe(true)
            expect(helpers.toBoolean('TRUE')).toBe(true)
            expect(helpers.toBoolean('True')).toBe(true)
        })
        it('should parse boolean (number -> false)', () => {
            expect(helpers.toBoolean(0)).toBe(false)
        })
        it('should parse boolean (number -> true)', () => {
            expect(helpers.toBoolean(1)).toBe(true)
        })
        it('should parse invalid values to false', () => {
            expect(helpers.toBoolean(-1)).toBe(false)
            expect(helpers.toBoolean(2)).toBe(false)
            expect(helpers.toBoolean('X')).toBe(false)
            expect(helpers.toBoolean(undefined)).toBe(false)
            expect(helpers.toBoolean(new Date())).toBe(false)
        })
    })

    describe('parseValue', () => {
        it('should parse number', () => {
            expect(helpers.parseValue({type: 'number'}, '12345')).toEqual(12345)
        })
        it('should parse boolean', () => {
            expect(helpers.parseValue({type: 'boolean'}, 1)).toBe(true)
            expect(helpers.parseValue({type: 'boolean'}, 0)).toBe(false)
        })
        it('should handle null', () => {
            expect(helpers.parseValue({type: 'string'}, 'null')).toBe(null)
        })
    })
})
