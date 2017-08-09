import React from 'react';
import PropTypes from 'prop-types';

import  '../../styles/userList.scss';

const UserListInterface = (props) => {
    
    let { defaultGroup, 
          userGroups, 
          nickname, 
          chatObject,
          setActiveChatState, 
          updateUnseenMsgCount,
          toggleCollapse } = props;

    // Check for unseen messages
    let getUnseenMsgCount = (chatId) => {
        if(Object.keys(chatObject).length > 0) {
            if(chatObject.hasOwnProperty(chatId)) {
                return chatObject[chatId].unseenMsgCount;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    // Update chatroom with the selected conversation
    let updateChatState = (isGroup, event) => {
        let recipientId , recipientName, unseenMsgCount;

        recipientId = event.currentTarget.id;

        if(isGroup) {
            recipientName = userGroups[recipientId].get('groupName');
        } else {
            recipientName = recipientId;
        }

        unseenMsgCount = getUnseenMsgCount(recipientId);
        setActiveChatState(recipientId, recipientName);
        toggleCollapse();
        unseenMsgCount !==0 && updateUnseenMsgCount(recipientId, 'reset');
    }



    // Render active users list
    let renderUsersList = (group, nickname) => {
        let element, usersList, unseenMsgCount;
        usersList = [...group.get('members')];
        usersList = usersList.filter((user) => user !== nickname);

        element = usersList.map((user) => {
            unseenMsgCount = getUnseenMsgCount(user);
            return (
                <li className = 'users-list' 
                    id = {user} 
                    key = {user}
                    onClick = {updateChatState.bind(null, false)}
                > 
                    <span>{user}</span>
                    {unseenMsgCount !== 0 && <span>{unseenMsgCount}</span>}
                </li>
            )});
        return element;
    }

    // Render list of groups which user is a part of
    let renderGroupsList = (groupsList) => {
         let element, groups, unseenMsgCount;
         groups = Array.from(Object.keys(groupsList));

         element = groups.map((group) => {
            unseenMsgCount = getUnseenMsgCount(group);
            return (
                <li className = 'groups-list' 
                    id = {group} 
                    key = {group}
                    onClick = {updateChatState.bind(null, true)}
                > 
                    <span>{groupsList[group].get('groupName')}</span>
                    {unseenMsgCount !== 0 && <span>{unseenMsgCount}</span>}
                </li>
            )});
        return element;
    }

    return (
        <div id = 'conversations-container'>
            <div id = 'list-containers'>
                <ul type = 'none' id = 'group-list-container'>
                    {renderGroupsList(userGroups)}
                </ul>

                <ul id = 'friend-list-container'>
                    {props.defaultGroup.length > 0 && renderUsersList(props.userGroups[defaultGroup], nickname)}
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