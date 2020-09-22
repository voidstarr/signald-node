const Request = require("./Request");
const Address = require("../protocol/Address");

module.exports = class GetIdentities extends Request {
    constructor(username, recipientAddress) {
        super("get_identities");
        const usernameMalformed = (username === undefined || typeof username !== "string");
        const recipientAddressMalformed = (recipientAddress === undefined || !(recipientAddress instanceof Address));

        if(usernameMalformed) {
            throw Error("AddDevice: username malformed");
        }

        this.username = username;

        if(!recipientAddressMalformed) {
            this.recipientAddress = recipientAddress;
        }
    }
};