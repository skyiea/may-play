const session = require('express-session');

const MongoStore = require('connect-mongo')(session);
const mongooseDb = require('../config/mongoose');

module.exports = new MongoStore({
    mongooseConnection: mongooseDb.connection,
    autoRemove: 'interval'
});