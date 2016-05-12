module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('socket connected');

        socket.emit('hello');
    });
};