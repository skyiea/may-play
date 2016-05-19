const session = require('express-session');

const MongoStore = require('connect-mongo')(session);
const mongooseInst = require('./mongooseInst');

module.exports = new MongoStore({
    mongooseConnection: mongooseInst.connection,
    autoRemove: 'interval'
});