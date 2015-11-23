import http from 'http';
import httpdispatcher from 'httpdispatcher';
import fs from 'fs';

const PORT    = 4321;
const server  = http.createServer();

server.
    on('request', (request, response) => {
        httpdispatcher.dispatch(request, response);
    }).
    listen(PORT, () => {
        console.log('Server listening on: http://localhost:%s', PORT);
    });

httpdispatcher.setStaticDirname(__dirname);
httpdispatcher.setStatic('public');

httpdispatcher.onGet('/', (request, response) => {
    const file_path = 'index.html';

    fs.exists(file_path, (exists) => {
        if (exists) {
            fs.readFile(file_path, (err, file) => {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(file);
            });
        } else {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('500 Interval error');
        }
    });
});

httpdispatcher.onGet(/^\/.+/, (request, response) => {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('404 Not found');
});