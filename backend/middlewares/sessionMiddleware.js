const session = require('express-session');

const MongoStore = require('connect-mongo')(session);
const mongooseDb = require('../config/mongoose');

const secret = require('../config/secret');

module.exports = session({
    secret,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    rolling: true,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongooseDb.connection,
        autoRemove: 'interval'
    })
});