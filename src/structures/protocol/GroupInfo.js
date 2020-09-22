const Address = require("./Address");

/*
    https://gitlab.com/thefinn93/signald/-/wikis/Protocol/JsonGroupInfo
*/

module.exports = class GroupInfo {
    constructor(groupId, members, name, avatarId) {
        this.payload = {};
        const groupIdMalformed = (groupId === undefined || typeof groupId !== "string");
        const membersOfWrongType = (members === undefined || typeof members !== Array);
        const membersElementsOfWrongType = membersOfWrongType ? true : (members.find((el) => {el === undefined || typeof el !== Address;}) !== undefined);
        const membersMalformed = membersOfWrongType || membersElementsOfWrongType;
        const nameMalformed = (name === undefined || typeof name !== "string");
        const avatarIdMalformed = (avatarId === undefined || typeof avatarId !== Number);

        if (groupIdMalformed) {
            throw new Error("GroupInfo: groupId malformed");
        } else {
            this.groupId = groupId;
        }

        if(!membersMalformed) {
            this.members = [];
            for (var m of members) {
                this.members.push(m.payload);
            }
        }

        if(!nameMalformed) {
            this.name = name;
        }

        if(!avatarIdMalformed) {
            this.avatarId = avatarId;
        }
    }
};