
const actions = (() => {
    return {
        // Redirect user to chat
        redirectUser : (shouldRedirectUser, nickname) => ({
            type: 'REDIRECT_USER',
            payload: {shouldRedirectUser, nickname}
        }),

        // Add user to group
        addUserToGroup: (groupName, groupId, usersList, admin) => ({
            type: 'ADD_USER_TO_GROUP',
            payload: {groupName, groupId, usersList, admin}
        }),

        // Remove user from group
        removeUserFromGroup: (groupsList, nickname) => ({
            type: 'REMOVE_USER_FROM_GROUP',
            payload: {groupsList, nickname}
        }),

        // Set active chat state
        setActiveChatState: (id, name) => ({
            type: 'SET_ACTIVE_CHAT',
            payload: {id, name}
        }),

        // Toggle collapse for conversations tab
        toggleCollapse: () => ({
            type: 'TOGGLE_COLLAPSE'
        }),

        // Update chat room with messages
        updateMessageList: (chatId, senderMsgpair) => ({
            type: 'UPDATE_CHAT_MESSAGES',
            payload: {chatId, senderMsgpair}
        }),

        // Update unseen msg count
        updateUnseenMsgCount: (chatId,type) => ({
            type: 'UPDATE_UNSEEN_MSG_COUNT',
            payload: {chatId, type}
        }),

        //
        shouldRedirectToGroupManagement: () => ({
            type: 'REDIRECT_TO_GROUP_MANAGEMENT'
        })
    }
})();

export default actions;
