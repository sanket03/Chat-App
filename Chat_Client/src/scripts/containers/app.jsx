import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Login from '../containers/login.jsx';
import ChatroomRoutes from '../components/chatroomRoutes.jsx';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.routeUser = this.routeUser.bind(this);
    }

    // Redirect to login page if user directly hits /chat URL
    routeUser() {
        if(!this.props.redirectToLogin) { 
            return (<ChatroomRoutes/>);
        }  
       else {
           return (<Redirect to = {'/'}/>);
        }
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path = '/' render = {() => ( <Login/> )}/>
                    <Route path = '/chat' render = {this.routeUser}/>
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps  = ({loginReducer}) =>  {
    return {
        redirectToLogin : !loginReducer.proceedToChat
    }
}

// Typechecking for props
App.propTypes = {
    redirectToLogin: PropTypes.bool
}

export default connect(mapStateToProps)(App);