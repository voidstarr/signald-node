const Request = require("./Request");

module.exports = class SetExpiration extends Request {
    constructor(username, recipientGroupId, groupName, members, groupAvatar) {
        super("update_group");
        const usernameMalformed = (username === undefined || typeof username !== "string");
        const recipientGroupIdMalformed = (recipientGroupId === undefined || typeof recipientGroupId !== "string");
        const groupNameMalformed = (groupName === undefined || typeof groupName !== "string");
        const membersOfWrongType = (members === undefined || !(members instanceof Array));
        const membersElementsOfWrongType = membersOfWrongType ? true : (members.find((el) => {el === undefined || !( typeof el !== "string");}) !== undefined);
        const membersMalformed = membersOfWrongType || membersElementsOfWrongType;
        const groupAvatarMalformed = (groupAvatar === undefined || typeof groupAvatar !== "string");

        if (usernameMalformed) {
            throw new Error("SetExpiration: username malformed");
        }

        this.username = username;

        if (!recipientGroupIdMalformed) {
            this.recipientGroupId = recipientGroupId;
        }

        if(!groupNameMalformed) {
            this.groupName = groupName;
        }

        if(!membersMalformed) {
            this.members = members;
        }

        if(!groupAvatarMalformed) {
            this.groupAvatarMalformed = groupAvatarMalformed;
        }
    }
};