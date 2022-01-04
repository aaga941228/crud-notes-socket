import express from 'express';
import { Server as WebSocketServer } from 'socket.io';
import http from 'http';

const app = express();
const httpServer = http.createServer(app);
const io = new WebSocketServer(httpServer);

app.use(express.static(__dirname + '/public'))

io.on('connection', (socket) => {
    socket.emit('ping');
})

httpServer.listen(3000, () => {
    console.log('server on port 3000');
});