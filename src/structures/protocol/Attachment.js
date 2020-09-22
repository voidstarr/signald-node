
/*
    https://gitlab.com/thefinn93/signald/-/wikis/Protocol/JsonAttachment
*/
module.exports = class Attachment {
    constructor(filename, caption, width, height, voiceNote, preview) {
        const filenameMalformed = (filename === undefined || typeof filename !== "string");
        const captionMalformed = (caption === undefined || typeof caption !== "string");
        const widthMalformed = (width === undefined || !Number.isInteger(width));
        const heightMalformed = (height === undefined || !Number.isInteger(height));
        const voiceNoteMalformed = (voiceNote === undefined || typeof voiceNote !== "boolean");
        const previewMalformed = (preview === undefined || typeof preview !== "string");

        if(filenameMalformed){
            throw new Error("Attachment: filename malformed");
        } else {
            this.filename = filename;
        }

        if(!captionMalformed) {
            this.caption = caption;
        }

        if(!widthMalformed) {
            this.width = width;
        }

        if(!heightMalformed) {
            this.height = height;
        }

        if(!voiceNoteMalformed) {
            this.voiceNote = voiceNote;
        }

        if(!previewMalformed) {
            this.preview = preview;
        }
    }
};