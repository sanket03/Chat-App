const loginEvents = () => {

    // Check whether a nickname is unique
    // Function is pure :) 
    let checkNickname = (nickname,roomsObj) => {
        let isUnique = true;
        for(let room in roomsObj) {
            if(roomsObj.hasOwnProperty(room)) {
                if(room === nickname) {
                    isUnique = false;
                    break;
                }
            }
        }
        return isUnique;
    }

    // Add new user to active user list
    let addUserToActiveUsersList = (nickname, {userList}) => {
        userList.push(nickname);
    }
    
    return {
        setNickname : (nickname, client, chat) => {
            let roomsObj = chat.io.sockets.adapter.rooms,
                shouldRedirectUser = checkNickname(nickname,roomsObj);
            if(shouldRedirectUser) {
                    client.join(nickname);
                    addUserToActiveUsersList(nickname,chat)
                    client.broadcast.emit('newUserJoined', nickname);
            }

            client.emit('redirectUser',shouldRedirectUser, nickname);
            delete roomsObj[client.id];
        },

        getActiveUsersList: (client,{userList}) => {
            client.emit('setActiveUsersList', userList);
        }
    }
}

module.exports = loginEvents;
