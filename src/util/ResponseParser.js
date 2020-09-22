const { Address, Account, Message } = require("../structures/protocol");
const DataMessage = require("../structures/protocol/DataMessage");
const { SendMessageResult } = require("../structures/responses");

class ResponseParser {
    static parse(rawResponse) {
        switch(rawResponse.type) {
        case "send_results":
            return ResponseParser.parseSendResults(rawResponse);
        case "message":
            return ResponseParser.parseMessage(rawResponse);
        case "unexpected_error":
            return rawResponse;
        case "account_list":
            return ResponseParser.parseListAccounts(rawResponse);
        case "linking_uri":
            return {type: "linking_uri", uri: rawResponse.data.uri};
        default:
            return rawResponse;
        }
    }
    
    static parseSendResults(rawResponse) {
        var resultList = [];
        for(var result of rawResponse.data)
            resultList.push(new SendMessageResult(result));
        return resultList;
    }

    static parseMessage(rawResponse) {
        var content;
        if(rawResponse.data.hasContent) {
            if ("dataMessage" in rawResponse.data) {
                content = new DataMessage(rawResponse.data.dataMessage);
            } else if ("syncMessage" in rawResponse.data) {
                // TODO: https://gitlab.com/thefinn93/signald/-/wikis/Protocol/JsonSyncMessage
            }
        }
        return new Message(rawResponse, content);
    }

    static parseListAccounts(rawResponse) {
        var accountList = [];
        for(var acc of rawResponse.data.accounts)
            accountList.push(new Account(acc));
        return accountList;
    }
}

module.exports = ResponseParser;