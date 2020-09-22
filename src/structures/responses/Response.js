module.exports = class Response {
    constructor(type) {
        this.type = type ? type : "unknown";
    }
};