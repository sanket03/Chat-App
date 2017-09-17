const chatroomEvents = () => {

    // Generate unique groupId 
    let generateGroupId = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    // Add new group to groupList
    let addToGroupsList = ({groupName, groupMembers, admin}, groupId, {groupList}) => {
        groupList.set(groupId, admin);
    }

    // Add users to group aka socketio room
    let addMembersToGroup = (groupObj, groupId, {io, userList}) => {
        groupObj.groupMembers.forEach((member) => {
            io.sockets.connected[userList.get(member)].join(groupId);
        });
        io.in(groupId).emit('newGroupCreated', groupObj);
    }

    return {

        // Send message to intended group or user
        // If recepient is not present in userList then its a group else its an individual client
        sendMessage: (client, {userList, io}, msgObject) => {
            let room, {recipient, sender, message} = msgObject;
                
            if(userList.has(recipient)) { 
                client.to(userList.get(recipient)).emit('responseToClientMsg', {sender, message})
            } else {
                try {
                    room = Object.keys(io.sockets.adapter.rooms[recipient].sockets);
                    if(room.includes(client.id)) {
                        client.broadcast.to(recipient).emit('responseToGroupMsg', msgObject); 
                    }
                }
                catch(exception) {
                    console.log('User or group is disconnected/deleted');
                }
            }
        },

        // Assign unique id to the group and add members to the group
        createGroup: (client, chat, groupObj) => {
            let groupId;
            groupId = generateGroupId();
            addToGroupsList(groupObj, groupId, chat);
            groupObj['groupId'] = groupId;
            addMembersToGroup(groupObj, groupId, chat);
        },

        // Edit already created group
        editGroup: (client, {io, groupList, userList}, groupObj) => {
            let currentMembers, socketObj, admin, memberIds = [],
                {
                    groupName,
                    groupId,
                    groupMembers
                } = groupObj;
            
            memberIds = groupMembers.map((member) => {
                return userList.get(member);
            })
            memberIds = new Set(memberIds);

            // Allow editing only if the user is admin of the group
            // To prevent debug hacking
            admin = groupList.get(groupId);
            groupObj[admin] = admin;
            if(userList.get(admin) === client.id) {
                currentMembers = Object.keys(io.sockets.adapter.rooms[groupId].sockets);

                // Remove the unselected members
                currentMembers.forEach((member) => {              
                    if(memberIds.has(member)) {
                        memberIds.delete(member);
                    }  else {
                        // Send delete group event to removed members and remove them from group
                        socketObj = io.sockets.connected[member]
                        socketObj.leave(groupId);
                        socketObj.emit('groupDeleted', groupId);
                    }
                });

                // add new members to the room
                [...memberIds].forEach((newMember) => {
                    io.sockets.connected[newMember].join(groupId);
                });

                // Emit event to the client
                client.broadcast.to(groupId).emit('groupEdited', groupObj);
            }
        },

        // Delete Group 
        deleteGroup: (client, {io}, groupId)  => {
            let groupMembers;
            client.broadcast.to(groupId).emit('groupDeleted', groupId);
            delete io.sockets.adapter.rooms[groupId];
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

