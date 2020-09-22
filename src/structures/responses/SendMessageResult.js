const Response = require("./Response");
const Address = require("../protocol/Address");

/*
    https://gitlab.com/thefinn93/signald/-/wikis/Protocol/v1/JsonSendMessageResult
*/


module.exports = class SendMessageResult extends Response {
    constructor(raw) {
        super("send_results");
        if (raw) {
            this.address = new Address(raw.address.number, raw.address.uuid);
            this.success = raw.success;
            this.networkFailure = raw.networkFailure;
            this.unregisteredFailure = raw.unregisteredFailure;
            this.identityFailure = raw.identityFailure;
        }
    }
};