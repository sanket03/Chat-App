const loginReducer = (
    state = {   proceedToChat : false , 
                rerender: false,
                isNicknameValidated: false,  
                nickname: ''
            },  action) => {

    switch(action.type) {

        case 'REDIRECT_USER': {
            let nextState = action.payload.shouldRedirectUser ? 
                                                                {
                                                                    ...state,
                                                                    proceedToChat : true, 
                                                                    rerender : true, 
                                                                    nickname: action.payload.nickname
                                                                } 
                                                              : 
                                                                {   ...state , 
                                                                    rerender : true,
                                                                };
            return nextState;
        }

        case 'SET_VALIDATION_STATE': {
            let nextState;
            nextState = {
                ...state,
                rerender : true,
                isNicknameValidated: action.payload
            }
            return nextState
        }

        default:
            return state;
    }
}

export default loginReducer;