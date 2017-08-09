const loginReducer = (state = {proceedToChat : false , rerender: false, nickname: ''}, action) => {

    switch(action.type) {

        case 'REDIRECT_USER': {
            let nextState = action.payload.shouldRedirectUser ? 
                                                                {
                                                                    proceedToChat : true, 
                                                                    rerender : true, 
                                                                    nickname: action.payload.nickname
                                                                } 
                                                              : 
                                                                {   ...state , 
                                                                    rerender : true
                                                                };
            return nextState;
        }

        default:
            return state;
    }
}

export default loginReducer;