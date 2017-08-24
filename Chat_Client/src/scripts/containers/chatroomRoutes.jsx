import React from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ManageGroup from './manageGroup.jsx';
import CreateGroup from './createGroup.jsx';
import Chatroom from '../components/chatroom.jsx';
import config from '../utilities/config';
import chatActions from '../actions/chatActions';
import groupActions from '../actions/groupActions';
import '../../styles/ChatContainer.scss';

class ChatroomRoutes extends React.Component {
    constructor(props) {
        super(props);
        this.socket = config.socket;
    }

    // Initialize socket io callbacks
    componentWillMount() {
        let {   addUserToGroup, 
                removeUserOnDisconnection, 
                setDefaultGroup, 
                setActiveChatState, 
                nickname,
                updateMessageList, 
                activeChat, 
                updateUnseenMsgCount   } = this.props;

        // Fetch list of active users
        this.socket.emit('getActiveUsersList');

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
            removeUserOnDisconnection(groupsList, nickname);
        });

        // Add new group to groups list
        this.socket.on('newGroupCreated', ({groupName, groupId, groupMembers, admin}) => {
            addUserToGroup(groupName, groupId, groupMembers, admin);
            admin === nickname && setActiveChatState(groupId, groupName); 
        })

        // Receive response from individual client
        this.socket.on('responseToClientMsg', ({sender, message}) => {
            updateMessageList(sender, {[sender]: message});
            sender !== this.props.activeChat.chatId && updateUnseenMsgCount(sender, 'increment');
        });

        // Receive response from a group
        this.socket.on('responseToGroupMsg', ({sender, recipient, message}) => {
            updateMessageList(recipient, {[sender]: message});
            recipient !== this.props.activeChat.chatId && updateUnseenMsgCount(recipient, 'increment');
        });
    }

    render() {
        return (
            <div className = 'row'>
                <div className = 'col-md-6 col-sm-9 col-10' id = 'chat-container'>
                    <Route exact path = '/chat' render = {() => (<Chatroom/>)}/>
                    <Route path = '/chat/manageGroup' render = {() => (<ManageGroup/>)}/>
                    <Route path = '/chat/createGroup' render = {() => (<CreateGroup/>)}/>
                </div>
            </div>
        );
    }
}

// Map store states to props
const mapStateToProps = ({loginReducer, chatroomReducer}) => {
    return {
        nickname: loginReducer.nickname,
        activeChat: chatroomReducer.activeChat
    }
}

// Map redux actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        addUserToGroup: (groupName, groupId, usersList, admin) => {
            dispatch(groupActions.addUserToGroup(groupName, groupId, usersList, admin));
        },

        removeUserOnDisconnection: (groupsList, nickname) => {
            dispatch(groupActions.removeUserOnDisconnection(groupsList, nickname));
        },
   
        setDefaultGroup: (groupId) => {
            dispatch(groupActions.setDefaultGroup(groupId));
        },

        setActiveChatState: (id, name) => {
            dispatch(chatActions.setActiveChatState(id, name));
        },

        updateMessageList: (chatId, senderMsgPair) => {
            dispatch(chatActions.updateMessageList(chatId, senderMsgPair));
        },

        updateUnseenMsgCount: (chatId, type) => {
            dispatch(chatActions.updateUnseenMsgCount(chatId, type));
        }
    }
}

// Typechecking for props
ChatroomRoutes.propTypes = {
    nickname: PropTypes.string,
    activeChat: PropTypes.object
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatroomRoutes));