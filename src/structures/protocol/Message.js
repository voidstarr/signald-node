const Address = require("./Address");

module.exports = class Message {
    constructor(raw, content) {
        this.username = raw.username;
        this.source = new Address(raw.source.number, raw.source.uuid);
        this.sourceDevice = raw.sourceDevice;
        this.type = raw.type;
        this.timestamp = raw.timestamp;
        this.timestampISO = raw.timestampISO;
        this.serverTimestamp = raw.serverTimestamp;
        this.serverDeliveredTimestamp = raw.serverDeliveredTimestamp;
        this.hasLegacyMessage = raw.hasLegacyMessage;
        this.hasContent = raw.hasContent;
        this.isUnidentifiedSender = raw.isUnidentifiedSender;
        this.content = content;
    }
};