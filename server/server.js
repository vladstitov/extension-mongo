"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const http = require('http');
function getFunction(ar) {
    switch (ar[0]) {
        case 'db':
            return database_1.Database[ar[1]];
            break;
        default:
            return null;
            break;
    }
}
const requestListener = function (request, response) {
    console.log(request.url);
    ///  if (request.method == 'POST') {
    if (request.method === 'OPTIONS') {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
        response.setHeader('Access-Control-Max-Age', 2592000);
        response.end();
        return;
    }
    const url = request.url;
    const ar = url.substring(1).split('/');
    let body = '';
    if (request.method === 'POST') {
        request.on('data', function (data) {
            body += data;
            console.log('Partial body: ' + body);
        });
        request.on('end', function () {
            const data = JSON.parse(body);
            const funct = getFunction(ar);
            if (funct) {
                funct(data).then(res => {
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify(res));
                });
            }
            else {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end('no function ' + ar.join(','));
            }
            console.log('Body: ' + body);
        });
    }
    else {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ result: 'OK' }));
    }
    //}
};
const server = http.createServer(requestListener);
server.listen(8080);
//# sourceMappingURL=server.js.map