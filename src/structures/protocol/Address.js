const { Util } = require("../../util");

/*
    https://gitlab.com/thefinn93/signald/-/wikis/Protocol/v1/JsonAddress
*/

module.exports = class Address {
    constructor(number, uuid) {
        const numberMalformed = (number === undefined || !Util.isE164Number(number));
        const uuidMalformed = (uuid === undefined || typeof uuid !== "string");
        
        if (numberMalformed && uuidMalformed) 
            throw new Error("Address: number and uuid malformed. One or the other must be set.");

        if(!numberMalformed) 
            this.number = number;
        
        if(!uuidMalformed)
            this.uuid = uuid;
    }
};