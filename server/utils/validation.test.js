const expect = require('expect');
const {isRealString} = require('./validation');

describe('isREalString', () => {
    it('shoul reject  non-string values',() => {
        var res = isRealString(98);
        expect(res).toBe(false);
    });
    it('shold reject string with only spaces', () => {
        var res = isRealString('   ');
        expect(res).toBe(false);
    });
    it('should allow string with non-space characters', () => {
        var res = isRealString('Fer');
        expect(res).toBe(true);
    });
});