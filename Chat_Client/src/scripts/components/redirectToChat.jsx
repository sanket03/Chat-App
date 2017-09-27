import React from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

const RedirectToChat = (props) => {

    return (
        props.isNicknameValidated ?
                                    props.proceedToChat ? <Redirect to = {'/chat'}/> 
                                                        : <div className = 'login-alerts'>Nickname not available. Choose another</div>
                                  :
                                    <div className = 'login-alerts'>Invalid nickname, No spaces buddy</div>
    );
}

// Typechecking for props
RedirectToChat.propTypes = {
    proceedToChat: PropTypes.bool
}

export default RedirectToChat;