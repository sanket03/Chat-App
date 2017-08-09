import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../actions/userActions';
import config from '../utilities/config';
import ChatUtilitiesInterface from '../components/chatUtilitiesInterface.jsx';

class ChatUtilities extends React.Component {
    constructor() {
        super();
        this.socket = config.socket;
        this.userMsgRef;
        this.sendMessage = this.sendMessage.bind(this);
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

        if(event.type === 'click' || event.which === 13) {
            updateMessageList(activeChat.chatId, {'you': msg});
            this.socket.emit('clientMessage',msgObject);
            this.userMsgRef.value = '';
        }
    }

    render() {
        return (
            <ChatUtilitiesInterface sendMessage = {this.sendMessage}>
                <input ref = {(input) => this.userMsgRef = input} 
                       placeholder = 'Type message here'  
                       type = 'text' 
                       onKeyPress = {this.sendMessage}
                />
            </ChatUtilitiesInterface>
        );
    }
}

const mapStateToProps = ({chatroomReducer, loginReducer}) => {
    return {
        activeChat: chatroomReducer.activeChat,
        nickname: loginReducer.nickname
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateMessageList: (chatId, senderMsgpair) => {
            dispatch(actions.updateMessageList(chatId, senderMsgpair));
        }
    }
}

// Typechecking for props
ChatUtilities.proptypes = {
    activeChat: PropTypes.Object,
    nickname: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatUtilities);