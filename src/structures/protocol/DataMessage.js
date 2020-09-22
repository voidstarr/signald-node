module.exports = class DataMessage {
    constructor(raw) {
        if(raw) {
            this.timestamp = raw.timestamp;
            this.body = raw.body;
            this.endSession = raw.endSession;
            this.expiresInSeconds = raw.expiresInSeconds;
            this.viewOnce = raw.viewOnce;
        }
    }
};