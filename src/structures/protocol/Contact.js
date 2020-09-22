const { Util } = require("../../util");
/*
    https://gitlab.com/thefinn93/signald#update_contact
*/

module.exports = class Contact {
    constructor(number, name, color) {
        const numberMalformed = (number === undefined || typeof number !== "string");
        const nameMalformed = (name === undefined || typeof name !== "string");
        const colorMalformed = (color === undefined || typeof color !== "string");

        if(numberMalformed){
            throw new Error("Quote: id malformed");
        }
        
        this.number = number;

        if(!nameMalformed) {
            this.name = name;
        }

        if(!colorMalformed) {
            this.color = color;
        }
    }
};