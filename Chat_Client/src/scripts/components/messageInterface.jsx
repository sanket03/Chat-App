import React from 'react';
import PropTypes from 'prop-types';

const MessageInterface = (props) => {
    let {activeChat, messageObject, groups} = props,
        {chatName, chatId} = activeChat;

    // Render chat messages based on whether its a group message or an individual message
    let renderMessages = (msgObject, chatId) => {
        let messageList, sender, msg, isSentByClient ,element;
        messageList  = msgObject[chatId].messageList.map((message,index) => {
            sender = Object.keys(message)[0];
            msg = message[sender];
            isSentByClient = sender === 'you' ? true : false;

            if(groups.hasOwnProperty(chatId)) {
                return (
                    <div className = {isSentByClient ? 'sender group-msg' : 'recipient group-msg'} key = {index}>
                        {!isSentByClient && <span>{sender}<br></br></span>}
                        <span>{msg}</span>
                    </div>
                )
            } else {
                return (
                    <div className = {isSentByClient ? 'sender' : 'recipient'} key = {index}>
                        <span>{msg}</span>
                    </div>
                )
            }
        })
        return messageList;
    }

    return (
        <div id = 'message-container'>
            <span id = 'active-chat'>{chatName}</span>
            <div id = 'message-list-container'>
                {messageObject.hasOwnProperty(chatId) && renderMessages(messageObject, chatId, groups)}
            </div>
        </div>
    );
}

MessageInterface.propTypes = {
    activeChat: PropTypes.object,
    messageObject: PropTypes.object
}

export default MessageInterface;