const config = require('./config.js');

const loginEvents = () => {

    let {defaultGroup, defaultId, defaultAdmin} = config;

    // Check whether a nickname is unique
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

        // Set nickname for the user and broadcast to other users that a new user has connected
        setNickname : (nickname, client, {userList}) => {
            let shouldRedirectUser;
            shouldRedirectUser = checkNickname(nickname, userList);

            if(shouldRedirectUser) {
                client.join(defaultId);
                addUserToActiveUsersList(client.id, nickname, userList);
                client.broadcast.emit('newUserJoined', defaultGroup, defaultId, nickname, defaultAdmin);
            }
            client.emit('redirectUser', shouldRedirectUser, nickname);
         },

        // Get the list of connnected users
        getActiveUsersList: (client,{userList}) => {
            client.emit('setActiveUsersList', defaultGroup, defaultId, [...userList.keys()], defaultAdmin);
            console.log(defaultGroup);
        }
    }
}

module.exports = loginEvents;
