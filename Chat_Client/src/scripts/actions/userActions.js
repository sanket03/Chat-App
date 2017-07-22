
const actions = (() => {
    return {
        // Redirect user to chat
        redirectUser : (shouldRedirectUser, nickname) => ({
            type: 'REDIRECT_USER',
            payload: {shouldRedirectUser, nickname}
        }),

        // Initialize active users list
        initializeActiveUsersList: (usersList,nickname) => ({
            type: 'INITIALIZE_ACTIVE_USERS_LIST',
            payload: {usersList, nickname}
        }),

        // Update active users list
        updateActiveUsersList: (connectedUser) => ({
            type: 'UPDATE_ACTIVE_USERS_LIST',
            payload: connectedUser
        }),

        // UpdateChatRoom with messages
        updateChatRoom: (msg) => ({
            type: 'UPDATE_CHAT_ROOM',
            payload: msg
        })
    }
})();

export default actions;
