const net = require("net");
const Util = require("./Util");
const ResponseParser = require("./ResponseParser");
const process = require("process");

class SocketHandler {
    constructor(socketPath, responseEmitter) {
        if (socketPath === undefined) {
            this.socketPath = "/var/run/signald/signald.sock";    
        } else if(typeof socketPath === "string") {
            this.socketPath = socketPath;
        } else {
            throw new Error("SocketHandler: socketPath malformed");
        }
        this.responseEmitter = responseEmitter;
        process.on("exit", ()=>this.disconnect());
    }

    async sendCommand(payload) {
        payload.id = Util.generateRandomID();
        if(process.env.SIGNALD_NODE_DEBUG)
            console.log("sendCommand:", JSON.stringify(payload));
        return new Promise((resolve) => {
            this.getSocket().then(sock => {
                // create callback that listens for a response from signald
                this.responseEmitter.on(payload.id, (response) => {
                    // when we get a response, clear callbacks, and resolve promise
                    this.responseEmitter.removeAllListeners(payload.id);
                    resolve(response);
                });
                sock.write(JSON.stringify(payload)+"\n", "utf8");
            });
        });
    }

    async getSocket() {
        if(!this.connected || !this.signaldSocket) {
            return this.connect();
        }
        return new Promise(resolve => resolve(this.signaldSocket));
    }

    async connect() {
        var sockHandler = this;
        return new Promise((resolve, reject) => {
            this.signaldSocket = net.createConnection({ path: this.socketPath }, () => {
                resolve(sockHandler.signaldSocket);
            });
            this.connected = true;
            this.signaldSocket.on("data", data => {
                if(process.env.SIGNALD_NODE_DEBUG)
                    console.log("recieved raw:", data, "typeof data", typeof data);
                
                if(typeof data === "string") {
                    var dataObj = JSON.parse(data);
                    if(typeof dataObj.id === "string" && sockHandler.responseEmitter.listenerCount(dataObj.id) > 0) {
                        // if the response has an id, and we're listening for a rsponse. route the response to the listener
                        sockHandler.responseEmitter.emit(dataObj.id, ResponseParser.parse(dataObj));
                    } // TODO: handle messages for which we're not listening
                }
            });
            this.signaldSocket.setEncoding("utf8"); 
            this.signaldSocket.on("end", () => {
                this.connected = false;
            });
            this.signaldSocket.on("close", () => {
                this.connected = false;
            });
            this.signaldSocket.on("error", (err) => { reject(err);});
        });
    }

    disconnect() {
        if(this.signaldSocket) {
            this.signaldSocket.destroy();
        }
    }
}

module.exports = SocketHandler;