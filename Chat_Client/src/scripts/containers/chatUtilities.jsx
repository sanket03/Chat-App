import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import chatActions from '../actions/chatActions';
import config from '../utilities/config';
import ChatUtilitiesInterface from '../components/chatUtilitiesInterface.jsx';

class ChatUtilities extends React.Component {
    constructor() {
        super();
        this.socket = config.socket;
        this.userMsgRef;
        this.isAdmin;
        this.isGroup;
        this.sendMessage = this.sendMessage.bind(this);
        this.setPropsForGroups = this.setPropsForGroups.bind(this);
    }

    // Control rendering of the component
    shouldComponentUpdate(nextProps) {
        let shouldRender;
        shouldRender = nextProps.activeChat === this.props.activeChat ? false : true;
        return shouldRender; 
    }

    // Set properties for groups
    setPropsForGroups({chatId}, userGroups, nickname) {
        if(Object.keys(userGroups).includes(chatId)) {
            this.isGroup = true;
            this.isAdmin = userGroups[chatId].get('admin') === nickname ? true : false;
        } else {
            this.isGroup = false;
        }    
    }

    // Send message to the group or individual client
    sendMessage(event) {
        let msgObject,
            msg = this.userMsgRef.value,
            {activeChat, nickname, updateMessageList} = this.props;

        msgObject = {
            'recipient': activeChat.chatId,
            'sender': nickname,
            'message': msg
        };

        if((event.type === 'click' || event.which === 13) && msg.length !== 0) {
            updateMessageList(activeChat.chatId, {'you': msg});
            this.socket.emit('clientMessage',msgObject);
            this.userMsgRef.value = '';
        }
    }

    render() {
        let {activeChat, userGroups, nickname, shouldRedirectToGroupManagement} = this.props;
        this.setPropsForGroups(activeChat, userGroups, nickname);
        return (
            <ChatUtilitiesInterface sendMessage = {this.sendMessage}
                                    isAdmin = {this.isAdmin}
                                    isGroup = {this.isGroup}
            >
                <input ref = {(input) => this.userMsgRef = input} 
                       placeholder = 'Type message here'  
                       type = 'text' 
                       onKeyPress = {this.sendMessage}
                />
            </ChatUtilitiesInterface>
        );
    }
}

// Map store states to props
const mapStateToProps = ({chatroomReducer, loginReducer, conversationListReducer}) => {
    return {
        activeChat: chatroomReducer.activeChat,
        nickname: loginReducer.nickname,
        userGroups: conversationListReducer.userGroups
    }
}

// Map redux actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        updateMessageList: (chatId, senderMsgpair) => {
            dispatch(chatActions.updateMessageList(chatId, senderMsgpair));
        }
    }
}

// Typechecking for props
ChatUtilities.proptypes = {
    activeChat: PropTypes.Object,
    nickname: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatUtilities);