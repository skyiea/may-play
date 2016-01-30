const express = require('express');
const path = require('path');

const login = require('./login');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

router.use('/login', login);

module.exports = router;