const Request = require("./Request");

/*
    https://gitlab.com/thefinn93/signald#verify
*/

class Verify extends Request {
    constructor(username, code) {
        super("verify");
        const usernameMalformed = (username === undefined || typeof username !== "string");
        const codeMalformed = (code === undefined || typeof code !== "string");

        if(usernameMalformed) {
            throw Error("Verify: username malformed");
        }

        if(codeMalformed) {
            throw Error("Verify: code malformed");
        }

        this.username = username;
        this.code = code;

    }
}

module.exports = Verify;