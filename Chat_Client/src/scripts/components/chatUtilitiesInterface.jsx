import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import ManageGroup from '../containers/manageGroup.jsx';
import CreateGroup from '../containers/createGroup.jsx';

const ChatUtilitiesInterface  = (props) => {

    return (
        <div id = 'chat-utilities-container' className = 'row'>
            <div className = 'col-lg-12 col-md-12'>
                <div className = 'input-group'>
                    {props.children}
                    <span className = {props.isGroup ? 'input-group-btn' : 'input-group-btn disable'}>
                        <button className = 'btn' type = 'button'>
                            <i className="fa fa-users" aria-hidden="true"></i>
                        </button>
                    </span>
                    <span className = 'input-group-btn'>
                        <button className = 'btn' type = 'button'>
                            <i className="fa fa-user-plus" aria-hidden="true"></i>
                        </button>
                    </span>
                    <span className = 'input-group-btn'>
                        <button className = 'btn' type = 'button' onClick = {props.sendMessage}>
                            <i className = 'fa fa-paper-plane' aria-hidden='true'></i>
                        </button>
                    </span>
                </div>
            </div>
        </div>
    )
}

ChatUtilitiesInterface.propTypes = {
    sendMessage: PropTypes.func,
    isAdmin : PropTypes.bool,
    isGroup: PropTypes.bool
}

export default ChatUtilitiesInterface;

