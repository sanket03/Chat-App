import React from 'react';
import PropTypes from 'prop-types';
import RedirectToChat from '../components/redirectToChat';
import '../../styles/login.scss';

const LoginInterface = (props) => {

    let {proceedToChat , rerender} = props;

    return(
        <div className = 'container' id = 'login-container'>
            <div id = 'app-name'>
                <i className = "fa fa-commenting-o" aria-hidden="true"></i>
                <span>HallaBol</span>
            </div>

            <div id = 'userdetails-container'>
                <span>Choose a Nickname</span>
                {props.children}
            </div>

            {rerender ? <RedirectToChat proceedToChat = {proceedToChat}/> : ''}

            <div className = {rerender ? 'slideup' : ''} id = 'tech-stack'>
                <span>Powered By: </span>
                <img src ='../../images/SocketIO.svg'/>
                <img src ='../../images/NodeJS.svg'/>
                <img src ='../../images/React.svg'/>
                <img src ='../../images/Redux.png'/>
            </div>
        </div>
    );
}

// Typechecking for props
LoginInterface.propTypes = {
    proceedToChat: PropTypes.bool,
    rerender: PropTypes.bool
}

export default LoginInterface;