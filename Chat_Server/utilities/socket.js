const socket = require('socket.io')(),
      loginEvents = require('./loginEvents')(),
      chatroomEvents = require('./chatroomEvents')(),
      chat = {};

chat.userList = new Set();
chat.io = socket;

chat.io.on('connection',(client) => {

    // Create a new room for the user
    client.on('setNickname', (nickname) => { loginEvents.setNickname(nickname, client, chat); });
 
    // Get the list of active clients
    client.on('getActiveUsersList', () => { loginEvents.getActiveUsersList(client, chat); });

    client.on('clientMessage', (msg) => {
        client.broadcast.emit('serverMessage',msg);
    });

    client.on('disconnecting', () => { chatroomEvents.userDisconnected(client, chat); });
})

module.exports = chat;

