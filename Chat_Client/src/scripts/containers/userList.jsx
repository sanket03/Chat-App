import React from 'react';
import {Collapse, Button} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import config from '../utilities/config';
import actions from '../actions/userActions.js';
import UserListInterface from '../components/userListInterface.jsx';

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.socket = config.socket;
        this.defaultGroup = '';
        this.setDefaultGroup = this.setDefaultGroup.bind(this);
    }

    componentDidMount() {
        let { addUserToGroup, removeUserFromGroup, setActiveChatState, nickname } = this.props;
        
        // Add user to default group
        this.socket.on('setActiveUsersList', (groupName, groupId, usersList, admin) => {
            this.setDefaultGroup(groupId);
            addUserToGroup(groupName, groupId, usersList, admin);
            setActiveChatState(groupId, groupName);    
        });
        
        // Update active users list when a new user gets connected
        this.socket.on('newUserJoined', (groupName, groupId, connectedUser, admin) => {
            this.setDefaultGroup(groupId);
            addUserToGroup(groupName, groupId, [connectedUser], admin); 
        });

        // Update active users list when user is disconnected
        this.socket.on('userDisconnected', (groupsList, nickname) => {
            removeUserFromGroup(groupsList, nickname);
        });

        // Fetch list of active users
        this.socket.emit('getActiveUsersList');
    }

    // Set default group name for users
    setDefaultGroup(groupId) {
        this.defaultGroup = this.defaultGroup.length === 0 ? groupId : this.defaultGroup; 
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
                        defaultGroup = {this.defaultGroup}
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
        nickname: loginReducer.nickname,
        messageObject: chatroomReducer.messageObject
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUserToGroup: (groupName, groupId, usersList, admin) => {
            dispatch(actions.addUserToGroup(groupName, groupId, usersList, admin));
        },

        removeUserFromGroup: (groupsList, nickname) => {
            dispatch(actions.removeUserFromGroup(groupsList, nickname));
        },

        setActiveChatState: (id, name) => {
            dispatch(actions.setActiveChatState(id, name));
        },

        toggleCollapse: () => {
            dispatch(actions.toggleCollapse());
        },

        updateUnseenMsgCount: (chatId, type) => {
            dispatch(actions.updateUnseenMsgCount(chatId, type));
        }
    }
}

// Typechecking for props
UserList.propTypes = {
    nickname: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
