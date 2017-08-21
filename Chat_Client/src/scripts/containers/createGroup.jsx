import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import config from '../utilities/config';

import groupActions from '../actions/groupActions';
import CreateGroupInterface from '../components/createGroupInterface.jsx';

class CreateGroup extends React.Component {
    constructor(props) {
        super(props);
        this.userList;
        this.groupNameRef;
        this.searchStringRef;
        this.socket = config.socket;
        this.filterUserList = this.filterUserList.bind(this);
        this.toggleUserSelection = this.toggleUserSelection.bind(this);
        this.createGroup = this.createGroup.bind(this);
    }

    // Get default list of users without search filter
    componentWillMount() {
        let {   initializeSearchResult,
                addUserToGroup  } = this.props;

        initializeSearchResult();

        // Add new group to groups list
        this.socket.on('newGroupCreated', ({groupName, groupId, groupMembers, admin}) => {
            addUserToGroup(groupName, groupId, groupMembers, admin);
        })
    }

    // Filter user list on the basis of search search searchString
    filterUserList() {
        let searchResult = this.searchStringRef.value;
        this.props.filterUserList(searchResult);
    }

    // Select or deselect users when a new group is created
    toggleUserSelection(event) {
        let user;
        user = event.currentTarget.id;
        this.props.toggleUserSelection(user)
    }

    // Create new group with selected members
    createGroup() {
        let groupName, groupMembers, admin;
        groupName = this.groupNameRef.value;
        groupMembers = this.props.selectedUsers;
        admin = this.props.admin;
        groupMembers.push(admin);

        // Emit event to service that a new group is being created
        this.socket.emit('createGroup', {groupName, groupMembers, admin});
    }
 
    render() {
        let { filterUserList, 
              searchResult, 
              selectedUsers,
              admin } = this.props;
        return (
            <CreateGroupInterface 
                userList = {searchResult}
                selectedUsers = {selectedUsers}
                admin = {admin}
                toggleUserSelection = {this.toggleUserSelection}
                createGroup = {this.createGroup}
            >
                <input placeholder = 'Conversation Name' 
                       required = 'true' 
                       ref = {(input) => this.groupNameRef = input}
                />
                <input placeholder = 'Search users' 
                       ref = {(input) => this.searchStringRef = input}
                       onKeyUp = {this.filterUserList}
                />
            </CreateGroupInterface>
        )
    }
}

const mapStateToProps = ({conversationListReducer, loginReducer}) => {
    return {
        admin: loginReducer.nickname,
        userGroups: conversationListReducer.userGroups,
        searchResult: conversationListReducer.searchResult,
        selectedUsers: conversationListReducer.selectedUsers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleUserSelection: (user) => {
            dispatch(groupActions.toggleUserSelection(user));
        },

        initializeSearchResult: () => {
            dispatch(groupActions.filterUserList(''));
        },

        filterUserList: (searchString) => {
            dispatch(groupActions.filterUserList(searchString));
        },

        addUserToGroup: (groupName, groupId, usersList, admin) => {
            dispatch(groupActions.addUserToGroup(groupName, groupId, usersList, admin));
        }
    }
}

// Typechecking for prop types
CreateGroup.propTypes = {
    admin: PropTypes.string,
    userGroups: PropTypes.object,
    searchResult: PropTypes.array,
    selectedUsers: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);