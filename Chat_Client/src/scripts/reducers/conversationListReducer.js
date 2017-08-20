const conversationListReducer = (
    state = {
                isCollapsed: true, 
                userGroups: {},
                searchResult: [],
                selectedUsers: [],
                defaultGroup: ''
            },action) => {
    switch(action.type) {

        case 'ADD_USER_TO_GROUP': {
            let nextState, updatedMembers, userGroups, currentMembers, intendedGroup,
                {groupName, groupId, usersList, admin} = action.payload;

            userGroups = {...state.userGroups};

            if(userGroups.hasOwnProperty(groupId)) {
                intendedGroup = new Map([...userGroups[groupId]]);
                currentMembers = [...intendedGroup.get('members')];
                updatedMembers = new Set([...currentMembers,...usersList]);
            } else {
                updatedMembers = new Set(usersList);
                userGroups[groupId] = new Map();
                intendedGroup = userGroups[groupId];
                intendedGroup.set('groupName', groupName);
                intendedGroup.set('admin', admin);
            }

            intendedGroup.set('members', updatedMembers);
            userGroups[groupId] = intendedGroup;
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
                        if(groupsList.includes(group)) {
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

        case 'SET_DEFAULT_GROUP': {
            let nextState,
                {defaultGroup} = state;

            defaultGroup = defaultGroup.length === 0 ? action.payload : defaultGroup;
            
            nextState = {
                ...state,
                defaultGroup: defaultGroup
            }
            return nextState;
        }

        default: 
            return state;
    }
} 

export default conversationListReducer;