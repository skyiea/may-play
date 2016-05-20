const omit = require('lodash.omit');

const wsConnections = require('./../wsConnections');
const SessionSockets = require('./../SessionSockets');
const getUsername = require('../../utils/getUsername');

const chatUsers = new SessionSockets;

const broadcastSessionEmit = (socket, eventName, payload) => {
    const sid = socket.request.sessionID;

    for (let iSid of chatUsers.getSessionsSids()) {
        if (iSid !== sid) {
            for (let iSocket of chatUsers.getSessionSockets(iSid)) {
                iSocket.emit(eventName, payload);
            }
        }
    }
};

const broadcastSocketEmit = (socket, eventName, payload) => {
    for (let iSid of chatUsers.getSessionsSids()) {
        for (let iSocket of chatUsers.getSessionSockets(iSid)) {
            if (iSocket !== socket) {
                iSocket.emit(eventName, payload);
            }
        }
    }
};

module.exports = function (nsp) {
    nsp.on('connection', (socket) => {
        const sid = socket.request.sessionID;

        getUsername(sid).then((userName) => {
            // it might be already disconnected while userName is fetched
            if (socket.connected) {
                const isNewUser = !chatUsers.sessionExists(sid);

                chatUsers.add(sid, socket);
                socket.emit('entered');
                socket.emit('server-message', `${chatUsers.getSessionsSids().length - 1} users online.`);

                if (isNewUser) {
                    broadcastSessionEmit(socket, 'server-message', `${userName} entered chat.`);
                }

                socket.
                    on('user-message', (message) => {
                        broadcastSocketEmit(socket, 'user-message', {
                            user: userName,
                            message,
                            date: Date.now()
                        });
                    }).
                    on('disconnect', () => {
                        chatUsers.remove(sid, socket);

                        if (!chatUsers.sessionExists(sid)) {
                            broadcastSessionEmit(socket, 'server-message', `${userName} left chat.`);
                        }
                    });
            }
        });
    });
};