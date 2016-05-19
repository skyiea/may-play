const getUsername = require('../../utils/getUsername');
const wsConnections = require('../wsConnections');
const wsChatRoutes = require('./wsChatRoutes');

module.exports = function (io) {
    io.
        on('connection', (socket) => {
            const sid = socket.request.sessionID;

            getUsername(sid).then((userName) => {
                wsConnections.add(sid, socket, userName);
            });

            socket.on('disconnect', () => {
                wsConnections.remove(sid, socket);
            });

            wsChatRoutes(socket);
        });
};