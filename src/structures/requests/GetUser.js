const Request = require("./Request");
const Address = require("../protocol/Address");

/*
    https://gitlab.com/thefinn93/signald#get_user
*/

module.exports = class GetUser extends Request {
    constructor(username, recipientAddress) {
        super("get_user");
        const usernameMalformed = (username === undefined || typeof username !== "string");
        const recipientAddressMalformed = (recipientAddress === undefined || typeof recipientAddress !== Address);

        if(usernameMalformed) {
            throw Error("AddDevice: username malformed");
        }

        this.username = username;

        if(!recipientAddressMalformed) {
            this.recipientAddress = recipientAddress;
        }
    }
};