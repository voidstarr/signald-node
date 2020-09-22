/*
    https://gitlab.com/thefinn93/signald/-/blob/master/src/main/java/io/finn/signald/JsonAccount.java
*/

module.exports = class Account {
    constructor(raw) {
        if(raw){
            this.deviceId = raw.deviceId;
            this.username = raw.username;
            this.filename = raw.filename;
            this.registered = raw.registered;
            this.has_keys = raw.has_keys;
            this.subscribed = raw.subscribed;
        }
    }
};