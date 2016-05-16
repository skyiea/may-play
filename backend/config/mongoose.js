const mongoose = require('mongoose');

const configDB = require('./database');

module.exports = mongoose.connect(configDB.url);