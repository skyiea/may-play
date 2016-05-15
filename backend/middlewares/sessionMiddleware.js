const session = require('express-session');

const secret = require('../config/secret');

module.exports = session({
    secret,
    resave: false,
    saveUninitialized: true
});