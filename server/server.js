const io = require('socket.io')(9000);
async function sendMessageToClient(socket, from, message) {
    socket.emit('message', {from : from, message: message});
}
async function createRoomForUser(socket, username) {
    socket.join(username);
}
async function processMessage(payload) {
    console.log(payload);
    let to = payload.to || '';
    let from = payload.from || '';
    let message = payload.message || '';
    sendMessageToClient(io.sockets.in(to), from, message);
}

io.on('connect', (socket) => {
    console.log("Connected");
    socket.on('join', req => {
        createRoomForUser(socket, req.username);
        console.log(`${req.username} joined chats`);
    })
    socket.on('message', payload => {
        let to = payload.to || '';
        let from = payload.from || '';
        let message = payload.message || '';
        processMessage({to: to, from: from, message: message });
    })
});

