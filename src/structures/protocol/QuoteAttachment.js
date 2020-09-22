const Attachment = require("./Attachment");

/*
    https://gitlab.com/thefinn93/signald/-/wikis/Protocol/JsonQuotedAttachment
*/

module.exports = class QuoteAttachment {
    constructor(contentType, fileName, thumbnail) {
        const contentTypeMalformed = (contentType === undefined || typeof contentType !== "string");
        const fileNameMalformed = (fileName === undefined || typeof fileName !== "string");
        const thumbnailMalformed = (thumbnail === undefined || typeof thumbnail !== Attachment);

        if(contentTypeMalformed || fileNameMalformed) {
            throw new Error("QuoteAttachment: contentType or fileName malformed");
        }

        this.contentType = contentType;
        this.fileName = fileName;

        if(!thumbnailMalformed) {
            this.thumbnail = thumbnail;
        }
    }
};