import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import config from '../utilities/config';
import actions  from '../actions/userActions';
import LoginInterface from '../components/loginInterface.jsx';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.userNameRef;
        this.socket = config.socket;
        this.setNickName = this.setNickName.bind(this);
    }
 
    componentDidMount() {
        this.socket.on('redirectUser', (shouldRedirectUser, nickname) => {
            this.props.redirectUser(shouldRedirectUser, nickname);
        })
    }

    // Emit server event to check whether the nickname is available
    setNickName(event) {
        if(event.which === 13) {
            this.socket.emit('setNickname',this.userNameRef.value);
        }
    }

     render() {
         let {proceedToChat , rerender} = this.props;
         return (
             <LoginInterface rerender = {rerender} proceedToChat = {proceedToChat}>
                <input ref = {(input) => this.userNameRef = input} 
                       onKeyPress = {this.setNickName}/>
             </LoginInterface>
         );
     }
}

const mapStateToProps  = ({loginReducer}) =>  {
    return {
        proceedToChat : loginReducer.proceedToChat,
        rerender : loginReducer.rerender
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        redirectUser: (shouldRedirectUser, nickname) => {
            dispatch(actions.redirectUser(shouldRedirectUser, nickname));
        }
    } 
}

// Typechecking for props
Login.propTypes = {
    proceedToChat: PropTypes.bool,
    rerender: PropTypes.bool,
    redirectUser: PropTypes.func
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);