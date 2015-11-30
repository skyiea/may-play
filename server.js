import path from 'path';
import express from 'express';
import http from 'http';

const PORT = 3000;

const app = express();
const server = http.Server(app);

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(PORT, () => {
    console.log('Server listening on: http://*:%s', PORT);
});