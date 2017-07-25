const userListReducer = (state = {activeUsers: new Set()}, action) => {

    switch(action.type) {
        
         case 'INITIALIZE_ACTIVE_USERS_LIST': {
            let activeUsers,
                nextState,
                activeUsersList = [...state.activeUsers, ...action.payload.usersList];
            activeUsersList = activeUsersList.filter((user) => user !== action.payload.nickname);
            activeUsers = new Set(activeUsersList);
            nextState = {
                activeUsers:activeUsers
            }
            return nextState;
         }

         case 'ADD_TO_ACTIVE_USERS_LIST': {
             let activeUsers,
                 nextState,
                 activeUsersList = [...state.activeUsers, action.payload];
             activeUsers = new Set(activeUsersList);        
             nextState = {
                 activeUsers: activeUsers
             }
             return nextState;
         }

         case 'REMOVE_FROM_ACTIVE_USERS_LIST': {
             let nextState, activeUsers;
             activeUsers = new Set([...state.activeUsers]);
             activeUsers.delete(action.payload);
             nextState = {
                 activeUsers: activeUsers
             }
             return nextState
         }

        default:
            return state;
    }

}

export default userListReducer;