import React from 'react';
import {connect} from 'react-redux';
import config from '../utilities/config';
import ChatUtilitiesInterface from '../components/chatUtilitiesInterface';

export default class ChatUtilities extends React.Component {

    constructor() {
        super();
        this.socket = config.socket;
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(event) {
        if(event.type === 'click' || event.which === 13) {
            this.socket.emit('clientMessage',this.refs.message.value);           
            this.refs.message.value = '';
        }
    }

    render() {
        return (
            <ChatUtilitiesInterface sendMessage = {this.sendMessage}>
                <input ref = 'message' placeholder = 'Type message here'  type = 'text' onKeyPress = {this.sendMessage}/>
            </ChatUtilitiesInterface>
        );
    }
}