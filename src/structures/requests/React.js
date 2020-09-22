const Request = require("./Request");
const Address = require("../protocol/Address");
const Reaction = require("../protocol");

module.exports = class React extends Request {
    constructor(username, recipientAddress, recipientGroupId, reaction) {
        super("react");
        const usernameMalformed = (username === undefined || typeof username !== "string");
        const recipientAddressMalformed = (recipientAddress === undefined || !(recipientAddress !== Address));
        const recipientGroupIdMalformed = (recipientGroupId === undefined || typeof recipientGroupId !== "string");
        const reactionMalformed = (reaction === undefined || !(reaction instanceof Reaction));

        if (recipientAddressMalformed && recipientGroupIdMalformed) {
            throw new Error("React: recipientAddress and recipientGroupId malformed. one or the other must be set properly");
        }

        if(usernameMalformed) {
            throw new Error("React: username malformed");
        }

        if(reactionMalformed) {
            throw new Error("React: reaction malformed");
        }

        this.username = username;
        this.reaction = reaction;

        if(!recipientAddressMalformed) {
            this.recipientAddress = recipientAddress;
        }
        
        if(!recipientGroupIdMalformed) {
            this.recipientGroupId = recipientGroupId;
        }
    }
};