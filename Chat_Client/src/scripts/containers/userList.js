import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import config from '../utilities/config';
import actions from '../actions/userActions.js';
import UserListInterface from '../components/userListInterface';

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.socket = config.socket;
    }

    componentDidMount() {
        let {updateActiveUsersList, initializeActiveUsersList, nickname} = this.props;

        // Set active users list
        this.socket.on('setActiveUsersList', (usersList) => {
            initializeActiveUsersList(usersList, nickname);
        });
        
        // Update active user list on client side
        this.socket.on('newUserJoined', (connectedUser) => {
            updateActiveUsersList(connectedUser);
        });

        // Fetch current list of active users
        this.socket.emit('getActiveUsersList');
    }

    render() {
        return(
            <UserListInterface activeUsersList = {this.props.activeUsersList}/>
        )
    }
}

const mapStateToProps  = ({userListReducer,loginReducer}) =>  {
    return {
        activeUsersList: [...userListReducer.activeUsers],
        nickname: loginReducer.nickname
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateActiveUsersList: (connectedUser) => {
            dispatch(actions.updateActiveUsersList(connectedUser));
        },
        initializeActiveUsersList: (usersList,nickname) => {
            dispatch(actions.initializeActiveUsersList(usersList,nickname));
        }
    } 
}

// Typechecking for props
UserList.propTypes = {
    nickname: PropTypes.string,
    activeUsersList: PropTypes.array,
    initializeActiveUsersList: PropTypes.func,
    updateActiveUsersList: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);