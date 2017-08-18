import React from 'react';
import {connect} from 'react-redux';

import CreateGroupInterface from '../components/createGroupInterface.jsx';

class CreateGroup extends React.Component {
    constructor(props) {
        super(props);
        this.userList;
    }

    // Extract list of users
    extractListOfUsers() {
        let {userGroups, defaultGroup} = this.props;
        this.userList = userGroups[defaultGroup].get('members');
    }
 
    render() {
        this.extractListOfUsers();
        return (
            <CreateGroupInterface userList = {[...this.userList]}/>
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
export default connect(mapStateToProps)(CreateGroup);