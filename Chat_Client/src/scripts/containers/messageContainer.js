import React from 'react';
import {connect} from 'react-redux';
import config from '../utilities/config';
import updateMessageContainer from  '../actions/userActions';

class MessageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.socket = config.socket;
        this.renderMessages = this.renderMessages.bind(this);
        this.getServerResponse();
    }

    renderMessages(chat) {
        let messageList  = chat.map((message,index) => {
            return (<div key = {index}>{message}</div>);
        })
        return messageList;
    }

    getServerResponse() {
        this.socket.on('serverMessage',(msg) => {
                this.props.updateMessageContainer(msg);
        });
    }

    render() {
        return (
            <div id = 'message-container'>
                {this.renderMessages(this.props.messageList)}
            </div>
        );
    }
} 

const mapStateToProps  = (state) =>  {
    return {
        messageList : state.chatroomReducer.messageList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateMessageContainer: (msg) => {
            dispatch(updateChatRoom(msg))
        }
    }    
}

export default connect(mapStateToProps,mapDispatchToProps)(MessageContainer);
