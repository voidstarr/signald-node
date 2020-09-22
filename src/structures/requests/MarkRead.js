const Request = require("./Request");
const Address = require("../protocol/Address");

/*
    https://gitlab.com/thefinn93/signald#mark_read
*/

class MarkRead extends Request {
    constructor(username, recipientAddress, timestamps, when) {
        super("mark_read");
        const usernameMalformed = (username === undefined || typeof username !== "string");
        const recipientAddressMalformed = (recipientAddress === undefined || typeof recipientAddress !== Address);
        const timestampsOfWrongType = (timestamps === undefined || typeof timestamps !== Array);
        const timestampsElementsOfWrongType = timestampsOfWrongType ? true : (timestamps.find((el) => {el === undefined || typeof el !== Number;}) !== undefined);
        const timestampsMalformed = timestampsOfWrongType || timestampsElementsOfWrongType;
        const whenMalformed = (when === undefined || !Number.isInteger(when));

        if(usernameMalformed) {
            throw Error("MarkRead: username malformed");
        }

        if(recipientAddressMalformed) {
            throw Error("MarkRead: recipientAddress malformed");
        }

        if(timestampsMalformed) {
            throw Error("MarkRead: timestamps malformed");
        }

        this.username = username;
        this.recipientAddress = recipientAddress;
        this.timestamps = timestamps;

        if(!whenMalformed) {
            this.when = when;
        }

    }
}

module.exports = MarkRead;