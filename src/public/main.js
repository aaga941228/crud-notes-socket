const socket = io();

socket.on('ping', (ping) => {
    console.log('ping: ', ping)
})