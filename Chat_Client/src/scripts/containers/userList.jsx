import React from 'react';
import {Collapse, Button} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import config from '../utilities/config';
import chatActions from '../actions/chatActions';
import UserListInterface from '../components/userListInterface.jsx';

class UserList extends React.Component {

    constructor(props) {
        super(props);
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

// Map store states to props
const mapStateToProps = ({conversationListReducer, loginReducer, chatroomReducer}) => {
    return {
        isCollapsed: conversationListReducer.isCollapsed,
        userGroups: conversationListReducer.userGroups,
        defaultGroup: conversationListReducer.defaultGroup,
        nickname: loginReducer.nickname,
        messageObject: chatroomReducer.messageObject,
    }
}

// Map redux actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        toggleCollapse: () => {
            dispatch(chatActions.toggleCollapse());
        },

        updateUnseenMsgCount: (chatId, type) => {
            dispatch(chatActions.updateUnseenMsgCount(chatId, type));
        },

        setActiveChatState: (id, name) => {
            dispatch(chatActions.setActiveChatState(id, name));
        }
    }
}

// Typechecking for props
UserList.propTypes = {
    nickname: PropTypes.string,
    defaultGroup: PropTypes.string,
    messageObject: PropTypes.object,
    isCollapsed: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
