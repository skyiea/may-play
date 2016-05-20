const getUsername = require('../../utils/getUsername');
const wsConnections = require('../wsConnections');

module.exports = function (nsp) {
    nsp.on('connection', (socket) => {
        const sid = socket.request.sessionID;

        getUsername(sid).then((userName) => {
            wsConnections.add(sid, socket, userName);
        });

        socket.on('disconnect', () => {
            wsConnections.remove(sid, socket);
        });
    });
};