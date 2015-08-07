var http        = require('http'),
    dispatcher  = require('httpdispatcher'),
    fs          = require('fs');

var PORT    = 1234,
    server  = http.createServer();

server.on('request', function (request, response) {
        dispatcher.dispatch(request, response);
    })
    .listen(PORT, function () {
        console.log('Server listening on: http://localhost:%s', PORT);
    });

dispatcher.setStaticDirname(__dirname);
dispatcher.setStatic('public');

dispatcher.onGet('/', function (request, response) {
    var file_path = 'index.html';

    fs.exists(file_path, function (exists) {
        if (exists) {
            fs.readFile(file_path, function (err, file) {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(file);
            });
        } else {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('500 Interval error');
        }
    });
});

dispatcher.onGet(/^\/.+/, function (request, response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('404 Not found');
});