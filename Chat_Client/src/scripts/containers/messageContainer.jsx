import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import config from '../utilities/config';
import actions from  '../actions/userActions';
import MessageInterface from '../components/messageInterface.jsx';

class MessageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.socket = config.socket;
    }

    // Handle message response from server
    componentDidMount() {
        let {updateMessageList, activeChat, updateUnseenMsgCount} = this.props;

        // Receive response from individual client
        this.socket.on('responseToClientMsg',({sender, message}) => {
            updateMessageList(sender, {[sender]: message});
            sender !== this.props.activeChat.chatId && updateUnseenMsgCount(sender, 'increment');
        });

        // Receive response from a group
        this.socket.on('responseToGroupMsg', ({sender, recipient, message}) => {
            updateMessageList(recipient, {[sender]: message});
            recipient !== this.props.activeChat.chatId && updateUnseenMsgCount(recipient, 'increment');
        })
    }

    render() {
        let {messageObject, activeChat, userGroups} = this.props;
        return (
            <MessageInterface 
                activeChat= {activeChat} 
                messageObject = {messageObject}
                groups = {userGroups}
            />
        );
    }
} 

const mapStateToProps  = ({chatroomReducer, conversationListReducer}) =>  {
    return {
        messageObject : chatroomReducer.messageObject,
        activeChat: chatroomReducer.activeChat,
        userGroups: conversationListReducer.userGroups
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateMessageList: (chatId, senderMsgPair) => {
            dispatch(actions.updateMessageList(chatId, senderMsgPair));
        },

        updateUnseenMsgCount: (chatId, type) => {
            dispatch(actions.updateUnseenMsgCount(chatId, type));
        }
    }    
}

// Typechecking for props
MessageContainer.propTypes = {
    activeChat: PropTypes.object,
    messageObject: PropTypes.object,
    userGroups: PropTypes.object
}

export default connect(mapStateToProps,mapDispatchToProps)(MessageContainer);
