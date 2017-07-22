import React from 'react';
import ChatUtilities from '../containers/chatUtilities';
import MessageContainer from '../containers/messageContainer';
import UserList from '../containers/userList';
import '../../styles/chatContainer.scss';

const ChatContainer = () => {

    return (
        <div className = 'container' id = 'chat-container'>
            <div className = 'row'>
                <div className = 'col-md-3 col-lg-3 col-sm-4 col-xs-4'>
                    <UserList/>
                </div>
                <div className = 'col-md-9 col-lg-9 col-sm-8 col-xs-8' id = 'chat-container-rightpane'>
                    <ChatUtilities/>
                    {/*<MessageContainer/> */}
                </div>
            </div>
        </div>
    );
}

export default ChatContainer;
