const chatroomReducer = (state = {activeChat: {}, messageObject: {}}, action) => {

    switch(action.type) {
        case 'UPDATE_CHAT_MESSAGES': {
            let nextState, msgList,
                {chatId, senderMsgpair} = action.payload,
                chatObject = {...state.messageObject};
            
            if(chatObject.hasOwnProperty(chatId)) {
                msgList = [...chatObject[chatId].messageList],
                msgList = [...msgList, senderMsgpair];
                chatObject[chatId] = {...chatObject[chatId], messageList: msgList};
            }
            else {
                msgList = [senderMsgpair];
                chatObject[chatId] = {messageList: msgList, unseenMsgCount: 0};            
            }

            nextState = {
                ...state,
                messageObject: chatObject
            };
            return nextState;
         }

        case 'UPDATE_UNSEEN_MSG_COUNT': {
            let nextState, unseenMsgCount,
                {chatId, type} = action.payload,
                chatObject = {...state.messageObject},
                intendedChat = {...chatObject[chatId]};
                
            unseenMsgCount = type === 'increment' ? intendedChat.unseenMsgCount + 1 : 0;
            intendedChat['unseenMsgCount'] = unseenMsgCount;
            chatObject[chatId] = intendedChat;                                        
            nextState = {
                ...state,
                messageObject: chatObject
            };
            return nextState;
        }

        case 'REMOVE_MESSAGE_HISTORY': {
            let nextState,
                messageObject = {...state.messageObject};
            delete messageObject[action.payload];
            nextState = {
                ...state,
                messageObject: messageObject
            }
            return nextState;
        }

        case 'SET_ACTIVE_CHAT': {
            let nextState,
                {id,name} = action.payload,
                {activeChat} = state;
            
            activeChat = {
                chatId: id,
                chatName: name
            };
            nextState = {
                ...state,
                activeChat: activeChat
            };
            return nextState;
        }

        default:
            return state;
    }
}

export default chatroomReducer;