const groupActions = (() => {
    return {
        // Add user to group
        addUserToGroup: (groupName, groupId, usersList, admin,type) => ({
            type: 'ADD_USER_TO_GROUP',
            payload: {groupName, groupId, usersList, admin,type}
        }),

        // Remove user from group
        removeUserOnDisconnection: (groupsList, nickname) => ({
            type: 'REMOVE_USER_ON_DISCONNECTION',
            payload: {groupsList, nickname}
        }),

        // Set default state
        setDefaultGroup: (groupId) => ({
            type: 'SET_DEFAULT_GROUP',
            payload: groupId
        }),

        // Filter user list based on search string
        filterUserList: (searchString) => ({
            type: 'FILTER_USER_LIST',
            payload: searchString
        }),

        // Toggle selection of users when a new group is created
        toggleUserSelection: (user) => ({
            type: 'TOGGLE_USER_SELECTION',
            payload: user
        }),

        // Validate group name on click of create group button
        validateGroupCreation: (groupName) => ({
            type: 'VALIDATE_GROUP_CREATION'
        }),

        // Set group name while user is typing
        setGroupName: (value) => ({
            type: 'SET_GROUP_NAME',
            payload: value
        }),

        // Set selected members while managing group
        setSelectedMembers: (groupId) => ({
            type: 'SET_SELECTED_MEMBERS',
            payload: groupId
        }),

        // Reset validation state for creating group
        resetGroupValidationState: () => ({
            type: 'RESET_GROUP_VALIDATION_STATE'
        }),

        // Reset selected members
        resetSelectedMembers: () => ({
            type: 'RESET_SELECTED_MEMBERS'
        })
    }
})();

export default groupActions;