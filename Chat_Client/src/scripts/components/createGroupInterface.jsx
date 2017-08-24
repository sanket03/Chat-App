import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/createGroup.scss';

const CreateGroupInterface = (props) => {
    let {   createGroup,
            inputValueForGroup,
            setGroupName,
            activeUsersCount
        } = props;

    // Render list of users
    let renderUserList = () => {
        let element,
            isSelected,
            { userList, 
              selectedUsers,
              admin,
              toggleUserSelection,
              children
            } = props;

        userList = userList.filter((user) => user !== admin);
        element = (
                    <div id = 'searchable-users-list'>
                        {children}
                        {userList.length !== 0  ? 
                                                    (
                                                        <ul>
                                                            {userList.map((user)=> {
                                                                isSelected = selectedUsers.includes(user);
                                                                return (
                                                                    <li className = 'list-group-item justify-content-between'
                                                                        id = {user}
                                                                        key = {user}
                                                                        onClick = {toggleUserSelection}
                                                                    >
                                                                        {user}
                                                                        {isSelected && <i className = 'fa fa-check' aria-hidden = 'true'></i>}
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    )
                                                :
                                                    (
                                                        <span>No results to display</span>
                                                    )}
                        
                    </div>
                )
        return element;
    }

    return (
        <div id = 'create-group-interface'>
            <input  id = 'group-name-input'
                    value = {inputValueForGroup}
                    className = {inputValueForGroup.length === 0 && 'invalid'}
                    onChange = {setGroupName}
            />
            {
                activeUsersCount > 1 ?
                                        renderUserList()
                                     :
                                        <span>There are no active users</span>
            }
            <button type = 'button'
                    className = 'btn btn-secondary'
                    onClick = {createGroup}
            >
                Create group
            </button>
        </div>
    )
}

CreateGroupInterface.propTypes = {
    admin: PropTypes.string,
    activeUserCount: PropTypes.number,
    selectedUsers: PropTypes.array,
    userList: PropTypes.array,    
    toggleUserSelection: PropTypes.func
}

export default CreateGroupInterface;