const Request = require("./Request");
const Address = require("../protocol/Address");

module.exports = class SetExpiration extends Request {
    constructor(username, recipientAddress, recipientGroupId, expiresInSeconds) {
        super("set_expiration");
        const usernameMalformed = (username === undefined || typeof username !== "string");
        const recipientAddressMalformed = (recipientAddress === undefined || !(recipientAddress instanceof Address));
        const recipientGroupIdMalformed = (recipientGroupId === undefined || typeof recipientGroupId !== "string");
        const expiresInSecondsMalformed = (expiresInSeconds === undefined || typeof expiresInSeconds !== "number");

        if (usernameMalformed) {
            throw new Error("SetExpiration: username malformed");
        }

        if (expiresInSecondsMalformed) {
            throw new Error("SetExpiration: expiresInSeconds malformed");
        }

        this.username = username;
        this.recipientAddress = recipientAddress;

        if (!recipientAddressMalformed) {
            this.recipientAddress = recipientAddress;
        }

        if (!recipientGroupIdMalformed) {
            this.recipientGroupId = recipientGroupId;
        }
    }
};