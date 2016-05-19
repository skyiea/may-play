const session = require('express-session');

const secret = require('../config/secret');
const mongoStore = require('../modules/mongoStore');

module.exports = session({
    secret,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    rolling: true,
    resave: true,
    saveUninitialized: true,
    store: mongoStore
});