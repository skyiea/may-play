const http      = require('http');
const path      = require('path');
const express   = require('express');
const router    = require('./routes/root');

const PORT = 3000;

const app = express();
const server = http.Server(app);

app.use('/public', express.static('public'));
app.use('/', router);

server.listen(PORT, () => {
    console.log('Server listening on: http://localhost:%s', PORT);
});