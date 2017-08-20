const groupActions = (() => {
    return {
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

        // Set default state
        setDefaultGroup: (groupId) => ({
            type: 'SET_DEFAULT_GROUP',
            payload: groupId
        })
    }
})();

export default groupActions;