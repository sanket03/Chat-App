import React from 'react';
import PropTypes from 'prop-types';
import  '../../styles/userList.scss';

const UserListInterface = (props) => {
    
    let {defaultGroup, userGroups, nickname} = props
    // Render active users list
    let renderUsersList = (group, nickname) => {
        let element, usersList;
        usersList = [...group.get('members')];
        usersList = usersList.filter((user) => user !== nickname);
        element = usersList.map((user) => (
            <li className = 'users-list' id = {user} key = {user}> {user} </li>
        ));
        return element;
    }

    // Render list of groups which user is a part of
    let renderGroupsList = (groupsList) => {
         let element, groups;
         groups = Array.from(Object.keys(groupsList));
         element = groups.map((group) => (
            <li className = 'groups-list' id = {groupsList[group].id} key = {group}> {group} </li>
         ));
        return element;
    }

    return (
        <div id = 'conversations-container'>
            <div id = 'list-containers'>
                <ul type = 'none' id = 'group-list-container'>
                    {props.defaultGroup.length > 0 ? renderGroupsList(userGroups) : ''}
                </ul>

                <ul id = 'friend-list-container'>
                    {props.defaultGroup.length > 0 ? renderUsersList(props.userGroups[defaultGroup], nickname) : ''}
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