'use strict';

const socketIO      = require('socket.io');
const cookie        = require('cookie');
const cookieParser  = require('cookie-parser');

const sessionMiddleware = require('../middlewares/sessionMiddleware');
const users = require('./wsUsers');
const secret = require('../config/secret');

module.exports = function (server) {
    const io = socketIO(server);

    io.
        use((socket, next) => {
            sessionMiddleware(socket.request, socket.request.res, next);
        }).
        use((socket, next) => {
            const { cookie: reqCookie } = socket.request.headers;
    
            if (reqCookie) {
                const signedSID = cookie.parse(reqCookie)['connect.sid'];
    
                if (cookieParser.signedCookie(signedSID, secret) !== socket.request.sessionID) {
                    console.log('[WS] Not authorized request: invalid cookie'.err);
                    next(new Error('Not authorized'));
                } else {
                    next();
                }
            } else {
                console.log('[WS] Not authorized request: no cookie'.err);
                next(new Error('Not authorized'));
            }
        }).
        on('connection', (socket) => {
            const sid = socket.request.sessionID;

            users.add(sid, socket);
            socket.emit('hello');

            socket.on('disconnect', () => {
                users.remove(sid, socket);
            });
        });
};