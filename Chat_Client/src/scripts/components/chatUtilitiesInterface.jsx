import React from 'react';
import PropTypes from 'prop-types';

const ChatUtilities  = (props) => {

    return (
        <div id = 'chat-utilities-container' className = 'row'>
            <div className = 'col-lg-12 col-md-12'>
                <div className = 'input-group'>
                    {props.children}
                    <span className = 'input-group-btn'>
                        <button id = 'send-btn' className = 'btn' type = 'button' onClick = {props.sendMessage}>
                            <i className = 'fa fa-paper-plane' aria-hidden='true'></i>
                        </button>
                    </span>
                </div>
            </div>
        </div>
    )
}

ChatUtilities.propTypes = {
    sendMessage: PropTypes.func
}

export default ChatUtilities;

