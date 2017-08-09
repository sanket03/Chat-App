const chatroomEvents = () => {
    return {

        // Send message to intended group or user
        // If recepient is not present in userList then its a group else its an individual client
        sendMessage: (client, msgObject, {userList}) => {
            let {recipient, sender, message} = msgObject;
            userList.has(recipient) ? client.to(userList.get(recipient)).emit('responseToClientMsg', {sender, message})
                                    : client.to(recipient).emit('responseToGroupMsg', msgObject);
        },

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

    module.exports = chatroomEvents;

