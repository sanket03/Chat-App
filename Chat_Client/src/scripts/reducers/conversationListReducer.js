const conversationListReducer = (state = {isCollapsed: true, userGroups: {}}, action) => {

    switch(action.type) {

        case 'ADD_USER_TO_GROUP': {
            let nextState, updatedMembers, userGroups, currentMembers, intendedGroup,
                {groupName, groupId, usersList} = action.payload;

            userGroups = {...state.userGroups};

            if(userGroups.hasOwnProperty(groupName)) {
                intendedGroup = new Map([...userGroups[groupName]]);
                currentMembers = [...intendedGroup.get('members')];
                updatedMembers = new Set([...currentMembers,...usersList]);
            } else {
                updatedMembers = new Set(usersList);
                userGroups[groupName] = new Map();
                intendedGroup = userGroups[groupName];
                intendedGroup.set('groupId', groupId);
            }

            intendedGroup.set('members', updatedMembers);
            userGroups[groupName] = intendedGroup;
            nextState = {
                ...state,
                userGroups: userGroups
            }
            return nextState;
        }

        case 'REMOVE_USER_FROM_GROUP' : {
            let nextState, userGroups, intendedGroup, groupMembers, groupId,
                {groupsList, nickname} = action.payload;

                userGroups = {...state.userGroups};

                for(let group in userGroups) {
                    if(userGroups.hasOwnProperty(group)) {
                        intendedGroup = new Map([...userGroups[group]]);
                        if(groupsList.includes(intendedGroup.get('groupId'))) {
                            groupMembers = new Set([...intendedGroup.get('members')])
                            groupMembers.delete(nickname);
                            intendedGroup.set('members', groupMembers);
                            userGroups[group] = intendedGroup;
                        }
                    }
                }
                
                nextState = {
                    ...state,
                    userGroups: userGroups
                }
            return nextState;
        }

        case 'TOGGLE_COLLAPSE': {
            let nextState,
                {isCollapsed} = state;
                
            nextState = {
                ...state,
                isCollapsed: !isCollapsed
            }
            return nextState;
        }

        default: 
            return state;
    }
} 

export default conversationListReducer;