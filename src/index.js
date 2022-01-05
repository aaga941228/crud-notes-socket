import express from 'express';
import { Server as WebSocketServer } from 'socket.io';
import http from 'http';

let notes = [];
const generateId = (socketId) => {
    return `${socketId}_${Date.now()}`;
};
const app = express();
const httpServer = http.createServer(app);
const io = new WebSocketServer(httpServer);

app.use(express.static(__dirname + '/public'))

io.on('connection', (socket) => {
    socket.emit('server:loadnotes', notes);

    socket.on('client:newnote', data => {
        const newNote = {
            ...data, id: generateId(socket.id)
        };
        notes = [...notes, newNote];
        io.emit('server:newnote', newNote);
    });

    socket.on('client:deletenote', id => {
        notes = notes.filter(note => note.id !== id);
        io.emit('server:loadnotes', notes);
    });

    socket.on('client:getnote', id => {
        const note = notes.find(note => note.id === id);
        socket.emit('server:selectednote', note);
    })

    socket.on('client:updatenote', note => {
        notes = notes.map(n => {
            if (n.id === note.id) {
                n = note;
            }
            return n;
        });
        io.emit('server:loadnotes', notes);
    })
})

httpServer.listen(3000, () => console.log('server on port 3000'));