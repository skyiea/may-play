'use strict';

class SocketsCollection {
    constructor() {
        this.items = {};
    }

    setName(sid, name) {
        if (this.items[sid]) {
            this.items[sid].name = name;
            console.log('[WS] [%s] Use name set'.ws, name);
        }
    }

    add(sid, socket) {
        if (!this.items[sid]) {
            this.items[sid] = {
                name: 'unknown',
                sockets: []
            };

            console.log('[WS] [%s] New user connected. SID: %s'.ws, this.items[sid].name, socket.request.sessionID);
            console.log('[WS] Total connected users: %s'.ws.bold, Object.keys(this.items).length);
        }

        const { sockets } = this.items[sid];

        if (sockets.indexOf(socket) === -1) {
            sockets.push(socket);
            console.log('[WS] [%s] New socket connected. Total user sockets: %s'.ws,
                        this.items[sid].name, sockets.length);
        } else {
            console.error('[WS] [%s] ERROR: socket already in array'.ws, this.items[sid].name);
        }
    }

    remove(sid, socket) {
        if (this.items[sid]) {
            const { sockets } = this.items[sid];
            const socketIndex = sockets.indexOf(socket);

            if (socketIndex !== -1) {
                sockets.splice(socketIndex, 1);
                console.log('[WS] [%s] Socket removed. Total user sockets: %s'.ws,
                            this.items[sid].name, sockets.length);

                if (sockets.length === 0) {
                    console.log('[WS] [%s] User removed from collection'.ws, this.items[sid].name);
                    delete this.items[sid];
                    console.log('[WS] Total connected users: %s'.ws.bold, Object.keys(this.items).length);
                }
            }
        }
    }

    getUserSockets(sid) {
        return this.items[sid];
    }
}

module.exports = new SocketsCollection;