const Request = require("./Request");

/*
    https://gitlab.com/thefinn93/signald#add_device
*/

class AddDevice extends Request {
    constructor(username, uri) {
        super("add_device");
        const usernameMalformed = (username === undefined || typeof username !== "string");
        const uriMalformed = (uri === undefined || typeof uri !== "string");

        if(usernameMalformed) {
            throw Error("AddDevice: username malformed");
        }

        if(uriMalformed) {
            throw Error("AddDevice: uri malformed");
        }

        this.username = username;
        this.uri = uri;
    }
}

module.exports = AddDevice;