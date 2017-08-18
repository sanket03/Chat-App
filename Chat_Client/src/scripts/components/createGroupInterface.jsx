import React from 'react';

const CreateGroupInterface = (props) => {

    let renderElement = () => {
        let element;
        element = props.userList.map((user)=> {
            return (
                <li id = {user}
                    key = {user}
                >
                    {user}
                </li>
            )
        })
        return element;
    }

    return (
        <ul>
            {renderElement()}
        </ul>
    )
}

export default CreateGroupInterface;