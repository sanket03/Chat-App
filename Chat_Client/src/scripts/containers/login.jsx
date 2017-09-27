import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import config from '../utilities/config';
import chatActions  from '../actions/chatActions';
import LoginInterface from '../components/loginInterface.jsx';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.userNameRef;
        this.socket = config.socket;
        this.setNickName = this.setNickName.bind(this);
    }
 
    componentWillMount() {
        this.socket.on('redirectUser', (shouldRedirectUser, nickname) => {
            this.props.redirectUser(shouldRedirectUser, nickname);
        })
    }

    // Emit server event to check whether the nickname is available
    setNickName(event) {
        let isNicknameValidated, nickname;
        nickname = this.userNameRef.value.trim();
        if(event.which === 13) {
            isNicknameValidated = nickname.search(/^\S{1,10}$/) === 0 ? true : false;
            this.props.setValidationState(isNicknameValidated);
            if(isNicknameValidated) {
                this.socket.emit('setNickname',nickname);
            }
        }
    }

     render() {
         let {proceedToChat , rerender, isNicknameValidated} = this.props;
         return (
             <LoginInterface 
                rerender = {rerender} 
                proceedToChat = {proceedToChat}
                isNicknameValidated = {isNicknameValidated}
            >
                <input ref = {(input) => this.userNameRef = input} 
                       onKeyPress = {this.setNickName}/>
             </LoginInterface>
         );
     }
}

// Map store states to props
const mapStateToProps  = ({loginReducer}) =>  {
    return {
        proceedToChat : loginReducer.proceedToChat,
        rerender : loginReducer.rerender,
        isNicknameValidated: loginReducer.isNicknameValidated
    }
}

// Map redux actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        redirectUser: (shouldRedirectUser, nickname) => {
            dispatch(chatActions.redirectUser(shouldRedirectUser, nickname));
        },

        setValidationState: (validationState) => {
            dispatch(chatActions.setValidationState(validationState))
        }
    } 
}

// Typechecking for props
Login.propTypes = {
    proceedToChat: PropTypes.bool,
    rerender: PropTypes.bool,
    isNicknameValidated: PropTypes.bool
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);