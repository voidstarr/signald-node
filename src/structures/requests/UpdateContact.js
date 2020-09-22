const Request = require("./Request");
const { Contact } = require("../protocol");

module.exports = class UpdateContact extends Request {
    constructor(username, contact) {
        super("update_contact");
        const usernameMalformed = (username === undefined || typeof username !== "string");
        const contactMalformed = (contact === undefined || !(contact instanceof Contact));

        if (usernameMalformed) {
            throw new Error("UpdateContact: username malformed");
        }

        if (contactMalformed) {
            throw new Error("UpdateContact: contact malformed");
        }

        this.username = username;
        this.contact = contact;
    }
};