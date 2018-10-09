var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('Should generate correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from,text);
        //console.log(expect);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    })
});
describe('generateLocationMessage',() => {
    it('should generate the correct location object', () => {
        var from = "Deb";
        var latitude = 32;
        var longitude = -110;
        var url = 'https://www.google.com/maps?q=32,-110';
        var message = generateLocationMessage(from, latitude,longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,url});
    });
});