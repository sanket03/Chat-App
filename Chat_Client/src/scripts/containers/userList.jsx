import React from 'react';
import {Collapse, Button} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import config from '../utilities/config';
import chatActions from '../actions/chatActions';
import groupActions from '../actions/groupActions';
import UserListInterface from '../components/userListInterface.jsx';

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.socket = config.socket;
    }

    componentWillMount() {
        let { addUserToGroup, 
              removeUserFromGroup, 
              setDefaultGroup, 
              setActiveChatState, 
              nickname } = this.props;
        
        // Add user to default group
        this.socket.on('setActiveUsersList', (groupName, groupId, usersList, admin) => {
            addUserToGroup(groupName, groupId, usersList, admin);
            setActiveChatState(groupId, groupName);    
            setDefaultGroup(groupId);
        });
        
        // Update active users list when a new user gets connected
        this.socket.on('newUserJoined', (groupName, groupId, connectedUser, admin) => {
            addUserToGroup(groupName, groupId, [connectedUser], admin); 
            setDefaultGroup(groupId);
        });

        // Update active users list when user is disconnected
        this.socket.on('userDisconnected', (groupsList, nickname) => {
            removeUserFromGroup(groupsList, nickname);
        });

        // Fetch list of active users
        this.socket.emit('getActiveUsersList');
    }

    // Update unseen chat count 
    updateNotification(messageObject, unseenChatCount) {
        for(let chatId in messageObject) {
            if(messageObject.hasOwnProperty(chatId)) {
                messageObject[chatId].unseenMsgCount !== 0 && unseenChatCount++;
            }
        }
        return unseenChatCount;
    }

    render() {
        let unseenChatCount = 0,
            {toggleCollapse, 
             isCollapsed,
             nickname,
             defaultGroup,
             messageObject,
             userGroups,
             updateUnseenMsgCount,
             setActiveChatState} = this.props;

        unseenChatCount = this.updateNotification(messageObject, unseenChatCount);

        return (
            <div id = 'conversations-tab'>
                <div className = {!isCollapsed ? 'overlay show': 'overlay hide'}
                     onClick = {toggleCollapse}>
                </div>
                <Button color = 'primary' onClick = {toggleCollapse}>
                    <span>
                        Conversations
                    </span>
                    <span className = 'unseen-chat-count'>
                        {unseenChatCount !== 0 && unseenChatCount}
                    </span>
                </Button>
                <Collapse isOpen = {!isCollapsed} delay = {{show:0}}>
                    <UserListInterface 
                        userGroups = {userGroups} 
                        chatObject = {messageObject}
                        defaultGroup = {defaultGroup}
                        nickname = {nickname}
                        toggleCollapse = {toggleCollapse}
                        setActiveChatState = {setActiveChatState}
                        updateUnseenMsgCount = {updateUnseenMsgCount}
                    />
                </Collapse>            
            </div>
        );
    }
}

const mapStateToProps = ({conversationListReducer, loginReducer, chatroomReducer}) => {
    return {
        isCollapsed: conversationListReducer.isCollapsed,
        userGroups: conversationListReducer.userGroups,
        defaultGroup: conversationListReducer.defaultGroup,
        nickname: loginReducer.nickname,
        messageObject: chatroomReducer.messageObject,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUserToGroup: (groupName, groupId, usersList, admin) => {
            dispatch(groupActions.addUserToGroup(groupName, groupId, usersList, admin));
        },

        removeUserFromGroup: (groupsList, nickname) => {
            dispatch(groupActions.removeUserFromGroup(groupsList, nickname));
        },
   
        setDefaultGroup: (groupId) => {
            dispatch(groupActions.setDefaultGroup(groupId));
        },

        setActiveChatState: (id, name) => {
            dispatch(chatActions.setActiveChatState(id, name));
        },

        toggleCollapse: () => {
            dispatch(chatActions.toggleCollapse());
        },

        updateUnseenMsgCount: (chatId, type) => {
            dispatch(chatActions.updateUnseenMsgCount(chatId, type));
        },
    }
}

// Typechecking for props
UserList.propTypes = {
    nickname: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
