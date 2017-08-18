import React from 'react';

import ChatUtilities from '../containers/chatUtilities.jsx';
import MessageContainer from '../containers/messageContainer.jsx';
import UserList from '../containers/userList.jsx';

const Chatroom = () =>  {

    return (
        <div id = 'chatroom'>
            <UserList/>
            <MessageContainer/>
            <ChatUtilities/>
        </div>
    );
}

export default Chatroom;