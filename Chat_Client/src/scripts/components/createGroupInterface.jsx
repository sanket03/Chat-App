import React from 'react';
import PropTypes from 'prop-types';

const CreateGroupInterface = (props) => {

    // Render list of users
    let renderElement = () => {
        let element,
            isSelected,
            { userList, 
              selectedUsers,
              admin
            } = props;

        userList = userList.filter((user) => user !== admin);
        element = userList.map((user)=> {
            isSelected = selectedUsers.includes(user);
            return (
                <li className = {'list-group-item justify-content-between'}
                    id = {user}
                    key = {user}
                    onClick = {props.toggleUserSelection}
                >
                    {user}
                   {isSelected && <i className = 'fa fa-check' aria-hidden = 'true'></i>}
                </li>
            )
        })
        return element;
    }

    return (
        <div id = 'create-group-interface'>
            {props.children}
            <ul className = 'list-group'>
                {renderElement()}
            </ul>
            <button type = 'button'
                    className = 'btn btn-secondary'
                    onClick = {props.createGroup}
            >
                Create group
            </button>
        </div>
    )
}

CreateGroupInterface.propTypes = {
    admin: PropTypes.string,
    selectedUsers: PropTypes.array,
    userList: PropTypes.array,
    toggleUserSelection: PropTypes.func
}

export default CreateGroupInterface;