const express = require('express');
const path = require('path');

const api = require('./api');

const router = express.Router();

router.use('/api', api);

router.get('/*', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

module.exports = router;