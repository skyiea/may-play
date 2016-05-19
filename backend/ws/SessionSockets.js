class SessionSockets {
    constructor() {
        this.sessionSocketMap = {};
    }

    add(sid, socket) {
        if (!this.sessionSocketMap[sid]) {
            this.sessionSocketMap[sid] = [];
        }

        const sockets = this.sessionSocketMap[sid];

        if (sockets.indexOf(socket) === -1) {
            sockets.push(socket);
        }
    }

    remove(sid, socket) {
        const sockets = this.sessionSocketMap[sid];

        if (sockets) {
            const socketIndex = sockets.indexOf(socket);

            if (socketIndex !== -1) {
                sockets.splice(socketIndex, 1);

                if (sockets.length === 0) {
                    delete this.sessionSocketMap[sid];
                }
            }
        }
    }

    getSessions() {
        return this.sessionSocketMap;
    }
    
    getSessionsSids() {
        return Object.keys(this.sessionSocketMap);
    }

    getSessionSockets(sid) {
        return this.sessionSocketMap[sid];
    }

    sessionExists(sid) {
        return !!this.getSessionSockets(sid);
    }
}

module.exports = SessionSockets;