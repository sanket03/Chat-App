import React from 'react';
import {Route, Redirect, WithRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import ManageGroup from './manageGroup.jsx';
import Chatroom from './chatroom.jsx';
import '../../styles/ChatContainer.scss';

export default class ChatroomRoutes extends React.Component {

    render() {
        return (
            <div className = 'row'>
                <div className = 'col-md-6 col-sm-9 col-10' id = 'chat-container'>
                    <Route exact path = '/chat' render = {() => (<Chatroom/>)}/>
                    <Route path = '/chat/manageGroup' render = {() => (<ManageGroup/>)}/>
                </div>
            </div>
        );
    }
}

