const socket = require('socket.io')(),
      loginEvents = require('./loginEvents')(),
      chatroomEvents = require('./chatroomEvents')(),
      chat = {};

chat.userList = new Map();
chat.groupList = new Map();
chat.io = socket;

chat.io.on('connection',(client) => {

    // Create a new room for the user
    client.on('setNickname', (nickname) => { loginEvents.setNickname(client, chat, nickname); });
 
    // Get the list of active clients
    client.on('getActiveUsersList', () => { loginEvents.getActiveUsersList(client, chat); });

    // Send the message to particular client or group
    client.on('clientMessage', (msgObject) => { chatroomEvents.sendMessage(client, chat, msgObject); });

    // Create new group
    client.on('createGroup', (groupObj) => { chatroomEvents.createGroup(client, chat, groupObj)});

    // Edit group
    client.on('editGroup', (groupObj) => { chatroomEvents.editGroup(client, chat, groupObj)})

    // Broadcast to all the users that client has disconnected
    client.on('disconnecting', () => { chatroomEvents.userDisconnected(client, chat); });
})

module.exports = chat;

