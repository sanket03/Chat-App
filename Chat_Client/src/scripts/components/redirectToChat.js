import React from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

const RedirectToChat = (props) => {

    return (
        props.proceedToChat ? <Redirect to = {'/chat'}/> 
                            : <div id = 'duplicate-nickname-alert'>Nickname not available. Choose another</div>
    );
}

// Typechecking for props
RedirectToChat.propTypes = {
    proceedToChat: PropTypes.bool
}

export default RedirectToChat;