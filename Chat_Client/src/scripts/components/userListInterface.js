import React from 'react';
import PropTypes from 'prop-types';
import  '../../styles/userList.scss';

const UserListInterface = (props) => {
    
    // Render active users list
    let renderUsersList = (userGroups) => {
        let element, usersList;
        usersList = [...userGroups.get(props.defaultGroup)];
        usersList = usersList.filter((user) => user !== props.nickname);
        element = usersList.map((user) => (
            <li className = 'users-list' key = {user}> {user} </li>
        ));
        return element;
    }

    // Render list of groups which user is a part of
    let renderGroupsList = (userGroups) => {
         let element, groups;
         groups = Array.from(userGroups.keys());
         element = groups.map((group) => (
            <li className = 'groups-list' key = {group}> {group} </li>
         ));
        return element;
    }

    return (
        <div id = 'conversations-container'>
            <span>Conversations</span>
            <div id = 'list-containers'>
                <ul type = 'none' id = 'group-list-container'>
                    {props.defaultGroup.length > 0 ? renderGroupsList(props.userGroups) : ''}
                </ul>

                <ul id = 'friend-list-container'>
                    {props.defaultGroup.length > 0 ? renderUsersList(props.userGroups) : ''}
                </ul>
            </div>
        </div>
    );
}

// Typechecking for props
UserListInterface.propTypes = {
    userGroups: PropTypes.object,
    defaultGroup: PropTypes.string,
    nickname: PropTypes.string
}

export default UserListInterface;