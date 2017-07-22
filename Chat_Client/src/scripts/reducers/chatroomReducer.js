const chatroomReducer = (state = {messageList:[]}, action) => {

    switch(action.type) {
        case 'UPDATE_CHAT_ROOM': {
            state = {
                messageList : [...state.messageList,action.payload]
            }
            return state;
         }

        default:
            return state;
    }

}

export default chatroomReducer;