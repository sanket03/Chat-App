const userGroupsReducer = (state = {userGroups: new Map()}, action) => {

    switch(action.type) {

        case 'ADD_USER_TO_GROUP': {
            let groupUsers, nextState, userGroups,
                {groupName, usersList} = action.payload;

            userGroups = new Map([...state.userGroups]);
            groupUsers = userGroups.has(groupName) ? 
                                                        new Set([...userGroups.get(groupName), ...usersList])
                                                   :   
                                                        new Set(usersList);
            userGroups.set(groupName, groupUsers);
            nextState = {
                userGroups: userGroups
            }
            return nextState;          
        }

        case 'REMOVE_USER_FROM_GROUP' : {
            let nextState, userGroups,
                {groupsList, nickname} = action.payload;

                userGroups = new Map([...state.userGroups]);

                groupsList.forEach((groupName) => {
                    let groupUsers = new Set([...userGroups.get(groupName)]);
                    groupUsers.delete(nickname);
                    userGroups.set(groupName, groupUsers);
                })
                
                nextState = {
                    userGroups: userGroups
                }
            return nextState;                    
        }

        default: 
            return state;
    }
} 

export default userGroupsReducer;