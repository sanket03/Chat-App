const chatActions = (() => {
    return {
        // Redirect user to chat
        redirectUser : (shouldRedirectUser, nickname) => ({
            type: 'REDIRECT_USER',
            payload: {shouldRedirectUser, nickname}
        }),

        // Validate nickname
        setValidationState: (nickname) => ({
            type: 'SET_VALIDATION_STATE',
            payload: nickname
        }),

        // Set active chat state
        setActiveChatState: (id, name) => ({
            type: 'SET_ACTIVE_CHAT',
            payload: {id, name}
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

        // Remove messages for disconnected users and deleted groups
        removeMessageHistory: (id) => ({
            type: 'REMOVE_MESSAGE_HISTORY',
            payload: id
        }),

        // Toggle collapse for conversations tab
        toggleCollapse: () => ({
            type: 'TOGGLE_COLLAPSE'
        })
    }
})();

export default chatActions;
