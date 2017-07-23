const userListReducer = (state = {activeUsers: new Set()}, action) => {

    switch(action.type) {
        
         case 'INITIALIZE_ACTIVE_USERS_LIST': {
            let activeUsers,
                activeUsersList = [...state.activeUsers, ...action.payload.usersList];
            activeUsersList = activeUsersList.filter((user) => user !== action.payload.nickname);
            activeUsers = new Set(activeUsersList);
            state = {
                activeUsers:activeUsers
            }
            return state;
         }

         case 'UPDATE_ACTIVE_USERS_LIST': {
             let activeUsers,
                 activeUsersList = [...state.activeUsers, action.payload];
             activeUsers = new Set(activeUsersList);        
             state = {
                 activeUsers: activeUsers
             }
             return state;
         }

        default:
            return state;
    }

}

export default userListReducer;