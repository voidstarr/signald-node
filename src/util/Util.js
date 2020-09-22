class Util {
    static generateRandomID() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    static isE164Number(num) {
        return typeof num === "string" && num.match(/^\+?[1-9]\d{1,14}$/) !== null;
    }
}

module.exports = Util;