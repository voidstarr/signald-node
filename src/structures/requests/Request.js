module.exports = class Request {
    constructor(type) {
        this.type = type ? type : "unknown";
    }
};