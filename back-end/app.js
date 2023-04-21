var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

const http = require("http");
const WebSocket = require('websocket');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const server = http.createServer();

const wsServer = new WebSocket.server({
    httpServer: server
});

let ignoreCount = 0;
let reportCount = 0;

wsServer.on('request', (request) => {
    const connection = request.accept(null, request.origin);

    console.log('A user connected');

    connection.sendUTF(JSON.stringify({ type: 'ignore', data: ignoreCount }));
    connection.sendUTF(JSON.stringify({ type: 'report', data: reportCount }));

    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            const data = JSON.parse(message.utf8Data);

            if (data.type === 'ignore') {
                ignoreCount++;
                wsServer.broadcast(JSON.stringify({ type: 'ignore', data: ignoreCount }));
            }
            else if (data.type === 'report') {
                reportCount++;
                wsServer.broadcast(JSON.stringify({ type: 'report', data: reportCount }));
            }
        }
    });

    // Register a WebSocket close event listener
    connection.on('close', () => {
        console.log('A user disconnected');
    });
});

server.listen(8080, () => {
    console.log('WS server is running on http://localhost:8080');
});

app.use('/', indexRouter);

module.exports = app;
