import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import config from '../utilities/config';
import {Redirect} from 'react-router-dom';

import groupActions from '../actions/groupActions';
import CreateGroupInterface from '../components/createGroupInterface.jsx';

class CreateGroup extends React.Component {
    constructor(props) {
        super(props);
        this.userList;
        this.isValidInput;
        this.activeUsersCount;
        this.searchStringRef;
        this.socket = config.socket;
        this.filterUserList = this.filterUserList.bind(this);
        this.toggleUserSelection = this.toggleUserSelection.bind(this);
        this.createGroup = this.createGroup.bind(this);
        this.setGroupName = this.setGroupName.bind(this);
        this.setActiveUsersCount = this.setActiveUsersCount.bind(this);
    }

    // Get default list of users without search filter
    componentWillMount() {
        this.props.initializeSearchResult();
        this.setActiveUsersCount();
    }

    // Create group only if group name is valid
    componentWillUpdate(nextProps) {
        nextProps.proceedWithGroupCreation && this.createGroup();
    }

    // Set active users count 
    setActiveUsersCount() {
        let {
            defaultGroup,
            userGroups
        } = this.props;
        this.activeUsersCount = [...userGroups[defaultGroup].get('members')].length;
    }

    // Filter user list on the basis of search string
    filterUserList() {
        let searchResult = this.searchStringRef.value;
        this.props.filterUserList(searchResult);
    }

    // Select or deselect users when a new group is created
    toggleUserSelection(event) {
        let user;
        user = event.currentTarget.id;
        this.props.toggleUserSelection(user);
    }

    // Create new group with selected members
    createGroup() {
        let groupName,
            {   selectedUsers: groupMembers,
                admin,
                inputValueForGroup
            } = this.props;
        groupName = inputValueForGroup;
        groupMembers.push(admin);

        // Emit event to service that a new group is being created
        this.socket.emit('createGroup', {groupName, groupMembers, admin});
    }

    // Set state for input box while typing group name
    setGroupName(event) {
        this.props.setGroupName(event.target.value);
    }
  
    render() {
        let { filterUserList, 
              searchResult, 
              selectedUsers,
              validateGroupCreation,
              proceedWithGroupCreation,
              inputValueForGroup,
              admin } = this.props;

        if(!proceedWithGroupCreation) {
            return (
                <CreateGroupInterface 
                    userList = {searchResult}
                    selectedUsers = {selectedUsers}
                    admin = {admin}
                    inputValueForGroup = {inputValueForGroup}
                    createGroup = {validateGroupCreation}
                    toggleUserSelection = {this.toggleUserSelection}
                    setGroupName = {this.setGroupName}
                    activeUsersCount = {this.activeUsersCount}
                >
                    <input placeholder = 'Search users' 
                           ref = {(input) => this.searchStringRef = input}
                           onKeyUp = {this.filterUserList}
                    />
                </CreateGroupInterface>)
        } else {
                return (<Redirect to = {'/chat'} />)
        }
    }

    // Reset selected members list and group validation state
    componentWillUnmount() {
        let {resetGroupValidationState, resetSelectedMembers} = this.props;
        resetSelectedMembers();
        resetGroupValidationState();
    }
}

// Map store states to props
const mapStateToProps = ({conversationListReducer, loginReducer}) => {
    return {
        admin: loginReducer.nickname,
        searchResult: conversationListReducer.searchResult,
        selectedUsers: conversationListReducer.selectedUsers,
        proceedWithGroupCreation: conversationListReducer.proceedWithGroupCreation,
        inputValueForGroup: conversationListReducer.inputValueForGroup,
        userGroups: conversationListReducer.userGroups,
        defaultGroup: conversationListReducer.defaultGroup
    }
}

// Map redux actions to props
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

        validateGroupCreation: () => {
            dispatch(groupActions.validateGroupCreation());
        },

        setGroupName: (value) => {
            dispatch(groupActions.setGroupName(value));
        },

        resetSelectedMembers: () => {
            dispatch(groupActions.resetSelectedMembers());
        },
         
        resetGroupValidationState: () => {
            dispatch(groupActions.resetGroupValidationState());
        }
    }
}

// Typechecking for prop types
CreateGroup.propTypes = {
    admin: PropTypes.string,
    searchResult: PropTypes.array,
    selectedUsers: PropTypes.array,
    proceedWithGroupCreation: PropTypes.bool,
    userGroups: PropTypes.object,
    defaultGroup: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);