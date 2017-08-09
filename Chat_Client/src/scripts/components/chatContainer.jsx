import React from 'react';

import ChatUtilities from '../containers/chatUtilities.jsx';
import MessageContainer from '../containers/messageContainer.jsx';
import UserList from '../containers/userList.jsx';
import '../../styles/chatContainer.scss';

const ChatContainer = () => {

    return (
        <div className = 'row'>
            <div className = 'col-md-6 col-sm-9 col-10' id = 'chat-container'>
                <UserList/>
                <MessageContainer/>
                <ChatUtilities/>
            </div>
        </div>
    );
}

export default ChatContainer;
