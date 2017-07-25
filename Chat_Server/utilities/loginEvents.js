const loginEvents = () => {

    const defaultGroup = 'Hall of Chatter';

    // Check whether a nickname is unique
    // Function is pure :) 
    let checkNickname = (nickname,userList) => {
        let isUnique;
        isUnique = !userList.has(nickname);
        return isUnique;
    }

    // Add new user to active user list
    let addUserToActiveUsersList = (nickname, userList) => {
        userList.add(nickname);
    }
    
    return {
        setNickname : (nickname, client, {userList}) => {
            let shouldRedirectUser = checkNickname(nickname, userList);

            if(shouldRedirectUser) {
                client.join(nickname);
                client.join(defaultGroup);
                addUserToActiveUsersList(nickname,userList);
                client.broadcast.emit('newUserJoined', defaultGroup, nickname);
            }

            client.emit('redirectUser', shouldRedirectUser, nickname);
            client.leave(client.id);
         },

        getActiveUsersList: (client,{userList}) => {
            client.emit('setActiveUsersList', defaultGroup, [...userList]);
        }
    }
}

module.exports = loginEvents;
