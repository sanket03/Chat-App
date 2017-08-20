import React from 'react';

const CreateGroupInterface = (props) => {

    let renderElement = () => {
        let element;
        element = props.userList.map((user)=> {
            return (
                <li className = 'list-group-item justify-content-between' 
                    id = {user}
                    key = {user}
                    onClick = {props.toggleUserSelection}
                >
                    {user}
                    <span className="badge badge-default badge-pill">14</span>
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
            >
                Create group
            </button>
        </div>
    )
}

export default CreateGroupInterface;