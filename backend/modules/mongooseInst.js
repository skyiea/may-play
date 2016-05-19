const mongoose = require('mongoose');

const dbURL = require('../config/databaseURL');

module.exports = mongoose.connect(dbURL);