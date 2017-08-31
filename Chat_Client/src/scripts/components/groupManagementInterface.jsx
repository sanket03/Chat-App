import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/createGroup.scss';

const GroupManagementInterface = (props) => {
    let {   groupActions,
            inputValueForGroup,
            setGroupName,
            activeUsersCount,
            routeType
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
                                                    )
                        }           
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
            <div id = 'button-container'>
                {
                    routeType === 'create-group' &&
                                                    <button type = 'button'
                                                            title ='Create Group'
                                                            className = 'btn btn-secondary'
                                                            onClick = {groupActions}
                                                    >
                                                        <i className = 'fa fa-plus' aria-hidden = 'true'></i>
                                                    </button>
                }

                {
                    routeType === 'manage-group' &&
                                                    <button type = 'button'
                                                            title ='Save Changes'
                                                            className = 'btn btn-secondary'
                                                            onClick = {groupActions}
                                                    >
                                                        <i className = 'fa fa-pencil-square-o' aria-hidden = 'true'></i>
                                                    </button>
                }

                {
                    routeType === 'manage-group' &&     
                                                    <button type = 'button'
                                                            title ='Delete Group'
                                                            className = 'btn btn-secondary'
                                                            onClick = {''}
                                                    >
                                                        <i className = 'fa fa-trash' aria-hidden = 'true'></i>
                                                    </button>

                }      
            </div>
        </div>
    )
}

GroupManagementInterface.propTypes = {
    admin: PropTypes.string,
    activeUserCount: PropTypes.number,
    selectedUsers: PropTypes.array,
    userList: PropTypes.array,    
    toggleUserSelection: PropTypes.func
}

export default GroupManagementInterface;