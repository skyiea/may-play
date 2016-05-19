const SessionSockets = require('./SessionSockets');

const GUEST_NAME = 'guest';
const connections = new SessionSockets;
const sessionUsernameMap = {};

function log(...args) {
    console.log('[WS]'.ws, ...args);
}

module.exports = {
    setName(sid, userName) {
        if (sessionUsernameMap[sid]) {
            sessionUsernameMap[sid] = userName || GUEST_NAME;
            log(`${sessionUsernameMap[sid]}`.yellow.bold, 'User name set'.ws);
        }
    },

    unsetName(sid) {
        this.setName(sid, GUEST_NAME);
    },

    add(sid, socket, userName) {
        sessionUsernameMap[sid] = userName || GUEST_NAME;
        connections.add(sid, socket);

        log(`${sessionUsernameMap[sid]}`.yellow.bold, `connected. SID: ${sid}`.ws);
        log(`Total connections: ${Object.keys(connections.getSessionsSids()).length}`.ws);
    },

    remove(sid, socket) {
        connections.remove(sid, socket);

        if (!connections.sessionExists(sid)) {
            log(`${sessionUsernameMap[sid]}`.yellow.bold, `disconnected. SID: ${sid}`.ws);
            log(`Total connections: ${Object.keys(connections.getSessionsSids()).length}`.ws);
        }
    }
};