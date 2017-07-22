import React from 'react';
import PropTypes from 'prop-types';

const UserList = (props) => {
    
    // Render active users list
    let renderUsersList = (props) => {
        let element = props.activeUsersList.map((user,index) => (
            <li key = {index}> {user} </li>
        ));
        return element;
    }

    return (
        <ul>
        {renderUsersList(props)}
        </ul>
    );
}

// Typechecking for props
UserList.propTypes = {
    activeUsersList: PropTypes.array
}

export default UserList;