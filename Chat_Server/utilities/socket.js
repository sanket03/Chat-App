const socket = require('socket.io')(),
      loginEvents = require('./loginEvents')(),
      chatroomEvents = require('./chatroomEvents')(),
      chat = {};

chat.userList = [];
chat.io = socket;

chat.io.on('connection',(client) => {

    // Create a new room for the user
    client.on('setNickname',(nickname) => {loginEvents.setNickname(nickname, client, chat);})
 
    client.on('clientMessage', (msg) => {
        client.broadcast.emit('serverMessage',msg);
    })

    client.on('disconnect',() => {
        chat.io.emit('serverMessage','client is disconnected');
    })
})

module.exports = chat;
