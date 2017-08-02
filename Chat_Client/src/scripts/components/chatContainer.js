import React from 'react';
import ChatUtilities from '../containers/chatUtilities';
import MessageContainer from '../containers/messageContainer';
import ConversationsTab from '../containers/conversationsTab';
import '../../styles/chatContainer.scss';

const ChatContainer = () => {

    return (
        <div className = 'row'>
            <div className = 'col-md-6 col-sm-9 col-10' id = 'chat-container'>
                <ConversationsTab/>
                <MessageContainer/>
                <ChatUtilities/>
            </div>
        </div>
    );
}

export default ChatContainer;
