const socketIO      = require('socket.io');
const cookie        = require('cookie');
const cookieParser  = require('cookie-parser');

const sessionMiddleware = require('../middlewares/sessionMiddleware');
const configNamespaces = require('./namespaces/configNamespaces');
const secret = require('../config/secret');

module.exports = function (server) {
    const io = socketIO(server);

    // middlewares
    io.
        use((socket, next) => {
            sessionMiddleware(socket.request, socket.request.res, next);
        }).
        use((socket, next) => {
            const { cookie: reqCookie } = socket.request.headers;

            if (reqCookie) {
                const signedSID = cookie.parse(reqCookie)['connect.sid'];

                if (signedSID) {
                    if (cookieParser.signedCookie(signedSID, secret) !== socket.request.sessionID) {
                        console.log('[WS] Not authorized request: invalid cookie'.err);
                        next(new Error('Not authorized'));
                    } else {
                        next();
                    }
                } else {
                    console.log('[WS] Not authorized request: no sessionID found in cookie'.err);
                }
            } else {
                console.log('[WS] Not authorized request: no cookie'.err);
                next(new Error('Not authorized'));
            }
        });
    
    configNamespaces(io);
};