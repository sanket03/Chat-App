import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import chatActions from  '../actions/chatActions';
import MessageInterface from '../components/messageInterface.jsx';

class MessageContainer extends React.Component {
    constructor(props) {
        super(props);
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

// Map store states to props
const mapStateToProps  = ({chatroomReducer, conversationListReducer}) =>  {
    return {
        messageObject : chatroomReducer.messageObject,
        activeChat: chatroomReducer.activeChat,
        userGroups: conversationListReducer.userGroups
    }
}

// Typechecking for props
MessageContainer.propTypes = {
    activeChat: PropTypes.object,
    messageObject: PropTypes.object,
    userGroups: PropTypes.object
}

export default connect(mapStateToProps)(MessageContainer);
