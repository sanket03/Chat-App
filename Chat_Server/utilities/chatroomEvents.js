const chatroomEvents = () => {

    // Generate unique groupId 
    let generateGroupId = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    // Add new group to groupList
    let addToGroupsList = ({groupName, groupMembers, admin}, groupId, groupList) => {
        groupList.set(groupId, admin);
    }

    return {

        // Send message to intended group or user
        // If recepient is not present in userList then its a group else its an individual client
        sendMessage: (client, {userList}, msgObject) => {
            let {recipient, sender, message} = msgObject;
            
            userList.has(recipient) ? client.to(userList.get(recipient)).emit('responseToClientMsg', {sender, message})
                                    : client.broadcast.to(recipient).emit('responseToGroupMsg', msgObject);
        },

        // Create new group 
        createGroup: (client, {groupList, io}, groupObj) => {
            let groupId

            groupId = generateGroupId();
            addToGroupsList(groupObj, groupId, groupList);
            groupObj = {
                ...groupObj,
                groupId = groupId
            }
            io.emit('newGroupCreated' ,groupObj);
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
    }
}

    module.exports = chatroomEvents;

