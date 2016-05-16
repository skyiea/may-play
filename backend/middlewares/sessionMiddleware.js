const session = require('express-session');

const MongoStore = require('connect-mongo')(session);
const mongooseDb = require('../config/mongoose');

const secret = require('../config/secret');

module.exports = session({
    secret,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongooseDb.connection })
});