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
        let { addUserToActiveUsersList, 
              removeUserFromActiveUsersList, 
              initializeActiveUsersList, 
              addUserToGroup,
              removeUserFromGroup,
              nickname } = this.props;

        // Set active users list
        // Add user to default group
        this.socket.on('setActiveUsersList', (groupName, usersList) => {
            initializeActiveUsersList(usersList, nickname);
            addUserToGroup(groupName, usersList);    
        });
        
        // Update active users list when a new user gets connected
        // Add user to default group
        this.socket.on('newUserJoined', (groupName, connectedUser) => {
            addUserToActiveUsersList(connectedUser);
            addUserToGroup(groupName, [connectedUser]); 
        });

        // Update active users list when user is disconnected
        this.socket.on('userDisconnected', (groupsList, nickname) => {
            removeUserFromActiveUsersList(nickname);
            removeUserFromGroup(groupsList, nickname);
        });

        // Fetch list of active users
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
        addUserToActiveUsersList: (connectedUser) => {
            dispatch(actions.addUserToActiveUsersList(connectedUser));
        },

        initializeActiveUsersList: (usersList,nickname) => {
            dispatch(actions.initializeActiveUsersList(usersList,nickname));
        },

        removeUserFromActiveUsersList: (nickname) => {
            dispatch(actions.removeUserFromActiveUsersList(nickname));
        },

        addUserToGroup: (groupName, usersList) => {
            dispatch(actions.addUserToGroup(groupName, usersList));
        },

        removeUserFromGroup: (groupsList, nickname) => {
            dispatch(actions.removeUserFromGroup(groupsList, nickname));
        }
    } 
}

// Typechecking for props
UserList.propTypes = {
    nickname: PropTypes.string,
    activeUsersList: PropTypes.array,
    initializeActiveUsersList: PropTypes.func,
    addUserToActiveUsersList: PropTypes.func,
    removeUserFromActiveUsersList: PropTypes.func,
    addUserToGroup: PropTypes.func,
    removeUserFromGroup: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);