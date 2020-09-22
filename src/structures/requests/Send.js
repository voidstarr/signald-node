const Request = require("./Request");
const Address = require("../protocol/Address");
const Attachment = require("../protocol/Attachment");
const Quote = require("../protocol/Quote");

/*
    https://gitlab.com/thefinn93/signald/-/wikis/Protocol/Request-Types/send
*/

module.exports = class Send extends Request {
    constructor(username, recipientAddress, recipientGroupId, messageBody, attachments, quote){
        super("send");
        const usernameMalformed = (username === undefined || typeof username !== "string");
        const recipientAddressMalformed = (recipientAddress === undefined || !(recipientAddress instanceof Address));
        const recipientGroupIdMalformed = (recipientGroupId === undefined || typeof recipientGroupId !== "string");
        const messageBodyMalformed = (messageBody === undefined || typeof messageBody !== "string");
        const attachmentsOfWrongType = (attachments === undefined || !(attachments instanceof Array));
        const attachementsElementsOfWrongType = attachmentsOfWrongType ? true : (attachments.find((el) => {el === undefined || !( el instanceof Attachment);}) !== undefined);
        const attachmentsMalformed = attachmentsOfWrongType || attachementsElementsOfWrongType;
        const quoteMalformed = (quote === undefined || !(quote instanceof Quote));
        
        if(usernameMalformed) {
            throw Error("Send: username malformed");
        }

        this.username = username;
        
        if (recipientAddressMalformed && recipientGroupIdMalformed) {
            throw Error("Send: recipientAddress and recipientGroupId malformed. One or the other must be set.");
        }
        
        if(!recipientAddressMalformed) {
            this.recipientAddress = recipientAddress;
        }

        if(!recipientGroupId) {
            this.recipientGroupId = recipientGroupId;
        }

        if(!messageBodyMalformed) {
            this.messageBody = messageBody;
        }

        if(!attachmentsMalformed) {
            this.attachments = attachments;
        }

        if(!quoteMalformed) {
            this.quote = quote.payload;
        }
    }
};