const Request = require("./Request");
const Address = require("../protocol/Address");

module.exports = class Trust extends Request {

    static isValidTrustLevel(trustLevel) {
        return trustLevel !== undefined 
                || typeof trustLevel !== "string"
                || trustLevel === "TRUSTED_VERIFIED" 
                || trustLevel === "TRUSTED_UNVERIFIED" 
                || trustLevel === "UNTRUSTED";
    }

    constructor(username, recipientAddress, fingerprint, trustLevel) {
        super("trust");
        const usernameMalformed = (username === undefined || typeof username !== "string");
        const recipientAddressMalformed = (recipientAddress === undefined || !(recipientAddress instanceof Address));
        const fingerprintMalformed = (fingerprint === undefined || typeof fingerprint !== "string");
        const trustLevelMalformed = !Trust.isValidTrustLevel(trustLevel);

        if(usernameMalformed) {
            throw Error("Trust: username malformed");
        }

        if(recipientAddressMalformed) {
            throw Error("Trust: recipientAddress malformed");
        }

        if(fingerprintMalformed) {
            throw Error("Trust: fingerprint malformed");
        }

        this.username = username;
        this.recipientAddress = recipientAddress;
        this.fingerprint = fingerprint;

        if(!trustLevelMalformed) {
            this.trustLevel = trustLevel;
        } else {
            this.trustLevel = "TRUSTED_VERIFIED";
        }
    }
};