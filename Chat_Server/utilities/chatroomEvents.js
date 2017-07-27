module.exports = chatroomEvents = () => {
    return {

        // Emit event to the server notifying user has disconnected
        userDisconnected: (client, {userList}) => {
            let disconnectedUser,
                roomsList =  Object.keys(client.rooms);

            for(let [key,value] of userList) {
                if(userList.get(key) === client.id) {
                    disconnectedUser = key;
                    break;
                }
            }
            
            roomsList = roomsList.filter((room) => 
                room !== userList.get(disconnectedUser)
            );

            userList.delete(disconnectedUser);
            client.broadcast.emit('userDisconnected', roomsList, disconnectedUser);
        }
    }}
