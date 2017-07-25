module.exports = chatroomEvents = () => {
    return {

        // Emit event to the server notifying user has disconnected
        userDisconnected: (client, {userList}) => {
            let roomsList =  Object.keys(client.rooms),
                disconnectedUser =  roomsList[0];
            roomsList = roomsList.filter((room) => 
                room !== disconnectedUser
            );
            userList.delete(disconnectedUser);
            client.broadcast.emit('userDisconnected', roomsList, disconnectedUser);
        }
    }}
