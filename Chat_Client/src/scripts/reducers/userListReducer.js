const userListReducer = (state = {isUsersListInitilized: false, isBroadcastedOnce:false, activeUsers:[]}, action) => {

    switch(action.type) {

         case 'INITIALIZE_ACTIVE_USERS_LIST': {
            let activeUsers = [...state.activeUsers, ...action.payload.usersList];
            activeUsers = activeUsers.filter((user,index,activeUsers) => 
                                        (activeUsers.indexOf(user) === index && user !== action.payload.nickname));
            state = {
                ...state,
                isUsersListInitilized: true,
                activeUsers:activeUsers
            }
            return state;
         }

         case 'UPDATE_ACTIVE_USERS_LIST': {
             let {isBroadcastedOnce} = state, activeUsers = [...state.activeUsers, action.payload];

            if(state.isUsersListInitilized && !state.isBroadcastedOnce) {
                activeUsers = activeUsers.filter((user,index,activeUsers) => 
                                                    (activeUsers.indexOf(user) === index));
                isBroadcastedOnce = true;
            }
            
             state = {
                 ...state,
                 isBroadcastedOnce: isBroadcastedOnce,
                 activeUsers: activeUsers
             }
             return state;
         }

        default:
            return state;
    }

}

export default userListReducer;