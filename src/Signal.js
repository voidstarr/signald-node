const { Send, Register, Verify, GetUser, MarkRead, AddDevice, GetIdentities, Trust, React, UpdateGroup, UpdateContact } = require("./structures/requests");
const Address = require("./structures/protocol/Address");
const SocketHandler = require("./util/SocketHandler");
const EventEmitter = require("events");
const SetExpiration = require("./structures/requests/SetExpiration");

module.exports = class Signal {
    constructor(username, socketPath) {
        if (username === undefined || typeof username !== "string") {
            throw new Error("Signal: username malformed");
        }
        this.responseEmitter = new EventEmitter();
        this.username = username;
        this.socketHandler = new SocketHandler(socketPath, this.responseEmitter);
    }

    async raw(command) {
        return this.socketHandler.sendCommand(command);
    }

    async send(recipientAddress, recipientGroupId, messageBody, attachments, quote) {
        return this.socketHandler.sendCommand(new Send(this.username, recipientAddress, recipientGroupId, messageBody, attachments, quote));
    }

    async register(captcha, voice) {
        return this.socketHandler.sendCommand(new Register(this.username, captcha, voice));
    }

    async verify(code) {
        return this.socketHandler.sendCommand(new Verify(this.username, code));
    }

    async markRead(recipientAddress, timestamps, when) {
        return this.socketHandler.sendCommand(new MarkRead(this.username, recipientAddress, timestamps, when));
    }

    async addDevice(uri) {
        return this.socketHandler.sendCommand(new AddDevice(this.username, uri));
    }

    async listAccounts() {
        return this.socketHandler.sendCommand({type: "list_accounts"});
    }

    async listGroups() {
        return this.socketHandler.sendCommand({type: "list_groups", username: this.username});
    }

    async updateGroup(recipientGroupId, groupName, members, groupAvatar) {
        return this.socketHandler.sendCommand(new UpdateGroup(this.username, recipientGroupId, groupName, members, groupAvatar));
    }
    
    async leaveGroup(recipientGroupId) {
        if (recipientGroupId === undefined || typeof recipientGroupId !== "string") {
            throw new Error("LeaveGroup: recipientGroupId malformed");
        }
        return this.socketHandler.sendCommand({type: "leave_group", recipientGroupId});
    }

    async link() {
        return this.socketHandler.sendCommand({type: "link"});
    }

    async getUser(recipientAddress) {
        const addr = typeof recipientAddress === "string" ? new Address(recipientAddress) : recipientAddress;
        const getUserObj = new GetUser(this.username, addr);
        return this.socketHandler.sendCommand(getUserObj);
    }

    async getIdentities(recipientAddress) {
        const addr = typeof recipientAddress === "string" ? new Address(recipientAddress) : recipientAddress;
        return this.socketHandler.sendCommand(new GetIdentities(this.username, addr));
    }

    async trust(recipientAddress, fingerprint, trustLevel) {
        const addr = typeof recipientAddress === "string" ? new Address(recipientAddress) : recipientAddress;
        return this.socketHandler.sendCommand(new Trust(this.username, addr, fingerprint, trustLevel));
    }

    async version() {
        return this.socketHandler.sendCommand({type: "version"});
    }

    async subscribe() {
        return this.socketHandler.sendCommand({type: "subscribe", username: this.username});
    }

    async unsubscribe() {
        return this.socketHandler.sendCommand({type: "unsubscribe", username: this.username});
    }

    async syncContacts() {
        return this.socketHandler.sendCommand({type: "sync_contacts", username: this.username});
    }

    async syncGroups() {
        return this.socketHandler.sendCommand({type: "sync_groups", username: this.username});
    }

    async syncConfiguration() {
        return this.socketHandler.sendCommand({type: "sync_configuration", username: this.username});
    }

    async listContacts() {
        return this.socketHandler.sendCommand({type: "list_contacts", username: this.username});
    }

    async updateContact(contact) {
        return this.socketHandler.sendCommand(new UpdateContact(this.username, contact));
    }

    async setExpiration(recipientAddress, recipientGroupId, expiresInSeconds) {
        const addr = typeof recipientAddress === "string" ? new Address(recipientAddress) : recipientAddress;
        return this.socketHandler.sendCommand(new SetExpiration(this.username, addr, recipientGroupId, expiresInSeconds));
    }

    async getProfile(recipientAddress) {
        const addr = typeof recipientAddress === "string" ? new Address(recipientAddress) : recipientAddress;
        return this.socketHandler.sendCommand({ type: "get_profile", username: this.username, recipientAddress: addr });
    }

    async setProfile(name) {
        return this.socketHandler.sendCommand({ type: "set_profile", username: this.username, name: name});
    }

    async react(recipientAddress, recipientGroupId, reaction) {
        const addr = typeof recipientAddress === "string" ? new Address(recipientAddress) : recipientAddress;
        return this.socketHandler.sendCommand(new React(this.username, addr, recipientGroupId, reaction));
    }

    disconnect() {
        this.socketHandler.disconnect();
    }

};