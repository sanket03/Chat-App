import React from 'react';
import {connect} from 'react-redux';

import CreateGroupInterface from '../components/createGroupInterface.jsx';

class CreateGroup extends React.Component {
    constructor(props) {
        super(props);
        this.userList;
        this.groupNameRef;
        this.userNameRef;
        this.extractListOfUsers = this.extractListOfUsers.bind(this);
    }

    // Extract list of users
    extractListOfUsers(userGroups, defaultGroup) {
        this.userList = userGroups[defaultGroup].get('members');
    }
 
    render() {
        let {toggleUserSelection, userGroups, defaultGroup} = this.props;
        this.extractListOfUsers(userGroups, defaultGroup);
        return (
            <CreateGroupInterface 
                userList = {[...this.userList]}
                toggleUserSelection = {this.props.toggleUserSelection}
            >
                <input placeholder = 'Conversation Name' required = 'true' ref = {(input) => this.groupNameRef = input}/>
                <input placeholder = 'Search users' ref = {(input) => this.userNameRef = input}/>
            </CreateGroupInterface>
        )
    }
}

const mapStateToProps = ({conversationListReducer, loginReducer}) => {
    return {
        admin: loginReducer.nickname,
        userGroups: conversationListReducer.userGroups,
        defaultGroup: conversationListReducer.defaultGroup
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleUserSelection: () => {
            dispatch(groupActions.toggleUserSelection);
        }
    }
}

export default connect(mapStateToProps)(CreateGroup);