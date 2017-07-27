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
        this.defaultGroup = '';
        this.setDefaultGroup = this.setDefaultGroup.bind(this);
    }

    componentDidMount() {

         let { addUserToGroup, removeUserFromGroup, nickname } = this.props;
        
        // Add user to default group
        this.socket.on('setActiveUsersList', (groupName, groupId, usersList) => {
            this.setDefaultGroup(groupName);
            addUserToGroup(groupName, groupId, usersList);    
        });
        
        // Update active users list when a new user gets connected
        this.socket.on('newUserJoined', (groupName, groupId, connectedUser) => {
            this.setDefaultGroup(groupName);
            addUserToGroup(groupName, groupId, [connectedUser]); 
        });

        // Update active users list when user is disconnected
        this.socket.on('userDisconnected', (groupsList, nickname) => {
            removeUserFromGroup(groupsList, nickname);
        });

        // Fetch list of active users
        this.socket.emit('getActiveUsersList');
    }

    // Set default group name for users
    setDefaultGroup(groupname) {
        this.defaultGroup = this.defaultGroup.length === 0 ? groupname : this.defaultGroup; 
    }

    render() {
        return(
            <UserListInterface userGroups = {this.props.userGroups} 
                               defaultGroup = {this.defaultGroup}
                               nickname = {this.props.nickname}/>
        )
    }
}

const mapStateToProps  = ({userGroupsReducer,loginReducer}) =>  {
    return {
        userGroups: userGroupsReducer.userGroups,
        nickname: loginReducer.nickname
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUserToGroup: (groupName, groupId, usersList) => {
            dispatch(actions.addUserToGroup(groupName, groupId, usersList));
        },

        removeUserFromGroup: (groupsList, nickname) => {
            dispatch(actions.removeUserFromGroup(groupsList, nickname));
        }
    } 
}

// Typechecking for props
UserList.propTypes = {
    nickname: PropTypes.string,
    addUserToGroup: PropTypes.func,
    removeUserFromGroup: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);