const SessionSockets = require('../../SessionSockets');

class ChatSessionSockets extends SessionSockets {
    constructor(...args) {
        super(...args);

        this.sidUserNameMap = {};
    }

    add(userName, sid, socket) {
        super.add(sid, socket);

        this.sidUserNameMap[sid] = userName;
    }

    remove(sid, socket) {
        super.remove(sid, socket);

        delete this.sidUserNameMap[sid];
    }

    getUserNames() {
        return Object.keys(this.sidUserNameMap).map((sid) => this.sidUserNameMap[sid]);
    }
}

module.exports = ChatSessionSockets;