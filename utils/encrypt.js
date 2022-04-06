global.navigator = { appName: 'protractor' };
global.window = {};

const JSEncrypt = require("jsencrypt");
const constants = require('./constants.js');

var encrypt = new JSEncrypt();

const { ENC_KEY } = constants;

module.exports = (data) => {
    try {
        encrypt.setPublicKey(ENC_KEY);
        return encrypt.encrypt(JSON.stringify(data));
    } catch (e) {
        console.log(e);
    }

}