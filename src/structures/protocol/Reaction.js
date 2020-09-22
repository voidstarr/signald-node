const Address = require("./Address");

module.exports = class Reaction {
    constructor(emoji, targetAuthor, targetSentTimestamp, remove) {
        const emojiMalformed = (emoji === undefined || typeof emoji !== "string");
        const targetAuthorMalformed = (targetAuthor === undefined || targetAuthor instanceof Address);
        const targetSentTimestampMalformed = (targetSentTimestamp === undefined || typeof targetSentTimestamp !== "number");
        const removeMalformed = (remove === undefined || typeof remove !== "boolean");

        if (emojiMalformed) {
            throw new Error("Reaction: emoji malformed");
        }

        if (targetAuthorMalformed) {
            throw new Error("Reaction: targetAuthor malformed");
        }

        if (targetSentTimestampMalformed) {
            throw new Error("Reaction: targetSentTimestamp malformed");
        }

        this.emoji = emoji;
        this.targetAuthor = targetAuthor;
        this.targetSentTimestamp = targetSentTimestamp;

        if (!removeMalformed) {
            this.remove = remove;
        }
    }
};