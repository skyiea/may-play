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

module.exports = function (socket) {
    const sid = socket.request.sessionID;

    socket.on('chat/enter', () => {
        getUsername(sid).then((userName) => {
            const isNewUser = !chatUsers.sessionExists(sid);

            function handleChatLeave() {
                chatUsers.remove(sid, socket);

                if (!chatUsers.sessionExists(sid)) {
                    broadcastSessionEmit(socket, 'chat/server-message', `${userName} left chat.`);
                }

                socket.
                    removeListener('chat/user-message', handleUserMessage).
                    removeListener('chat/leave', handleChatLeave).
                    removeListener('disconnect', handleChatLeave);
            }

            function handleUserMessage(message) {
                broadcastSocketEmit(socket, 'chat/user-message', {
                    user: userName,
                    message,
                    date: Date.now()
                });
            }

            chatUsers.add(sid, socket);
            socket.emit('chat/entered');
            socket.emit('chat/server-message', `${chatUsers.getSessionsSids().length - 1} users online.`);

            if (isNewUser) {
                broadcastSessionEmit(socket, 'chat/server-message', `${userName} entered chat.`);
            }

            socket.
                on('chat/user-message', handleUserMessage).
                on('chat/leave', handleChatLeave).
                on('disconnect', handleChatLeave);
        });
    });
};