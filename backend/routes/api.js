const express = require('express');
const bodyParser = require('body-parser');

const api = express.Router();

api.use(bodyParser.json());

api.post('/login', (req, res) => {
    console.log(req.body);
    res.send({
        successful: req.body.nickname === 'myrka'
    });
});

module.exports = api;