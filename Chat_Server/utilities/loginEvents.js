const loginEvents = () => {

    const defaultGroup = 'Hall of Chatter',
          defaultId = 'z-1111111';

    // Check whether a nickname is unique
    // Function is pure :) 
    let checkNickname = (nickname,userList) => {
        let isUnique;
        isUnique = !userList.has(nickname);
        return isUnique;
    }

    // Add new user to active user list
    let addUserToActiveUsersList = (clientId, nickname, userList) => {
        userList.set(nickname,clientId);
    }
    
    return {
        setNickname : (nickname, client, {userList}) => {
            let shouldRedirectUser = checkNickname(nickname, userList);

            if(shouldRedirectUser) {
                client.join(defaultId);
                client.join('test-room');
                addUserToActiveUsersList(client.id, nickname, userList);
                client.broadcast.emit('newUserJoined', defaultGroup, defaultId, nickname);
            }
            client.emit('redirectUser', shouldRedirectUser, nickname);
         },

        getActiveUsersList: (client,{userList}) => {
            client.emit('setActiveUsersList', defaultGroup, defaultId, [...userList.keys()]);
        }
    }
}

module.exports = loginEvents;
