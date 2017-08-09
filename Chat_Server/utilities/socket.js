const socket = require('socket.io')(),
      loginEvents = require('./loginEvents')(),
      chatroomEvents = require('./chatroomEvents')(),
      chat = {};

chat.userList = new Map();
chat.io = socket;

chat.io.on('connection',(client) => {

    // Create a new room for the user
    client.on('setNickname', (nickname) => { loginEvents.setNickname(nickname, client, chat); });
 
    // Get the list of active clients
    client.on('getActiveUsersList', () => { loginEvents.getActiveUsersList(client, chat); });

    // Send the message to particular client or group
    client.on('clientMessage', (msgObject) => { chatroomEvents.sendMessage(client, msgObject, chat); });

    // Broadcast to all the users that client has disconnected
    client.on('disconnecting', () => { chatroomEvents.userDisconnected(client, chat); });
})

module.exports = chat;

