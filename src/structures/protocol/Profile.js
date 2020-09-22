const Address = require("../protocol/Address");

module.exports = class Profile {
    constructor(name, avatar, identity_key, unidentified_access, unrestricted_unidentified_access, address) {
        const nameMalformed = (name === undefined || typeof name !== "string");
        const avatarMalformed = (avatar === undefined || typeof avatar !== "string");
        const identity_keyMalformed = (identity_key === undefined || typeof identity_key !== "string");
        const unidentified_accessMalformed = (unidentified_access === undefined || typeof unidentified_access !== "string");
        const unrestricted_unidentified_accessMalformed = (unrestricted_unidentified_access === undefined || typeof unrestricted_unidentified_access !== "string");
        const addressMalformed = (address === undefined || !(address instanceof Address));

        this.name = name;
        this.avatar = avatar;
        this.identity_key = identity_key;
        this.unidentified_access = unidentified_access;
        this.unrestricted_unidentified_access = unrestricted_unidentified_access;
        this.address = address;
    }
};