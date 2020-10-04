const io = require('socket.io-client')
const socket = io('http://localhost:3000')
/*For taking input from command line*/
const readline = require('readline')
const rl = readline.createInterface({
    input : process.stdin,
    output: process.stdout
});

socket.on('connect', () => {
    rl.question("Enter your username", (username) => {
        socket.emit('join', {username : username});
        rl.question('Enter user to message to', (to_username) => {
            rl.question('Enter your message', (to_message) => {
                socket.emit('message', {to : to_username, from: username, message: to_message});
            })
        });
    });
});

socket.on('message', payload => {
    console.log(`----------Message------------`);
    console.log(`From: ${payload.from}`);
    console.log(`Message: ${payload.data}`);
}) 

socket.on('diconnect', () => {
    console.log('You were disconnected');
});




