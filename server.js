import path from 'path';
import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

const PORT = 3000;

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const users = [];

io.on('connection', (socket) => {
    socket.on('login', (userName) => {
        socket.broadcast.emit('service-message', {
            type: 'logged-in',
            user: userName
        });

        socket.emit('service-message', {
            type: 'online-count',
            message: users.length
        });

        socket.
            on('message', (message) => {
                socket.broadcast.emit('message', {
                    user: userName,
                    text: message,
                    date: Date.now()
                });
            }).
            on('disconnect', () => {
                users.splice(users.indexOf(userName), 1);

                socket.broadcast.emit('service-message', {
                    type: 'logged-out',
                    user: userName
                });
            });

        users.push(userName);
    });
});

server.listen(PORT, () => {
    console.log('Server listening on: http://*:%s', PORT);
});