const Request = require("./Request");

/*
    https://gitlab.com/thefinn93/signald#register
*/

module.exports = class Register extends Request {
    constructor(username, captcha, voice){
        super("register");
        const usernameMalformed = (username === undefined || typeof username !== "string");
        const captchaMalformed = (captcha === undefined || typeof captcha !== "string");
        const voiceMalformed = (voice === undefined || typeof voice !== "boolean");

        if(usernameMalformed) {
            throw Error("Register: username malformed");
        }

        this.username = username;

        if(!captchaMalformed) {
            this.captcha = captcha;
        }

        if(!voiceMalformed) {
            this.voice = voice;
        }
    }
};