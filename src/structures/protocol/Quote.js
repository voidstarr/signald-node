const Address = require("./Address");
const QuoteAttachment = require("./QuoteAttachment");


/*
    https://gitlab.com/thefinn93/signald/-/wikis/Protocol/JsonQuote
*/

module.exports = class Quote {
    constructor(id, author, text, attachments) {
        const idMalformed = (id === undefined || typeof id !== "number");
        const authorMalformed = (author === undefined || !(author instanceof Address));
        const textMalformed = (text === undefined || typeof text !== "string");
        const attachmentsMalformed = (attachments === undefined || !(attachments instanceof QuoteAttachment)); // should this check for an array of QuoteAttachments?

        if(idMalformed){
            throw new Error("Quote: id malformed");
        } else {
            this.id = id;
        }

        if(authorMalformed) {
            throw new Error("Quote: author malformed");
        } else {
            this.author = author;
        }

        if(textMalformed) {
            throw new Error("Quote: text malformed");
        } else {
            this.text = text;
        }

        if(attachmentsMalformed) {
            console.log("Quote: attachements malformed. I think this is an optional field?"); // not explicit in the docs
        } else {
            this.attachments = attachments;
        }
    }
};