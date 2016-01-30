const express = require('express');
const bodyParser = require('body-parser');

const login = express.Router();

login.use(bodyParser.json());

login.post('/', (req, res) => {
    res.send('Hello user!');
});

module.exports = login;