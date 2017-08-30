import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import config from '../utilities/config';
import {Redirect} from 'react-router-dom';

import groupActions from '../actions/groupActions';
import GroupManagementInterface from '../components/groupManagementInterface.jsx';

class ManageGroup extends React.Component {
    constructor(props) {
        super(props);
        this.userList;
        this.isValidInput;
        this.activeUsersCount;
        this.searchStringRef;
        this.groupName;
        this.socket = config.socket;
        this.filterUserList = this.filterUserList.bind(this);
        this.toggleUserSelection = this.toggleUserSelection.bind(this);
        this.createGroup = this.createGroup.bind(this);
        this.setGroupName = this.setGroupName.bind(this);
        this.setClassMembers = this.setClassMembers.bind(this);
    }

    // Get default list of users without search filter
    componentWillMount() {
        let {
            filterUserList,
            routeType,
            setSelectedMembers
        } = this.props;
        this.setClassMembers();
        filterUserList('');
        routeType === 'manage-group' && setSelectedMembers(this.props.activeChat.chatId);
    }

    // Set active users count and initialize value for group name input box
    setClassMembers() {
        let {
            defaultGroup,
            userGroups,
            routeType,
            activeChat,
            inputValueForGroup
        } = this.props;

        this.activeUsersCount = [...userGroups[defaultGroup].get('members')].length;
        this.groupName = routeType === 'manage-group' ? activeChat.chatName : inputValueForGroup;
    }

    // Create group only if group name is valid
    componentWillUpdate(nextProps) {
        if(nextProps.inputValueForGroup !== this.props.inputValueForGroup) {
            this.groupName = nextProps.inputValueForGroup;
        }
        nextProps.proceedWithGroupCreation && this.createGroup();
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
              validateGroupCreation,
              proceedWithGroupCreation,
              selectedUsers,
              routeType,
              admin } = this.props;

        if(!proceedWithGroupCreation) {
            return (
                <GroupManagementInterface 
                    userList = {searchResult}
                    admin = {admin}
                    routeType = {routeType}
                    createGroup = {validateGroupCreation}
                    inputValueForGroup = {this.groupName}
                    selectedUsers = {selectedUsers}
                    toggleUserSelection = {this.toggleUserSelection}
                    setGroupName = {this.setGroupName}
                    activeUsersCount = {this.activeUsersCount}
                >
                    <input placeholder = 'Search users' 
                           ref = {(input) => this.searchStringRef = input}
                           onKeyUp = {this.filterUserList}
                    />
                </GroupManagementInterface>)
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
const mapStateToProps = ({conversationListReducer, loginReducer, chatroomReducer}) => {
    return {
        admin: loginReducer.nickname,
        activeChat: chatroomReducer.activeChat,
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

        filterUserList: (searchString) => {
            dispatch(groupActions.filterUserList(searchString));
        },

        validateGroupCreation: () => {
            dispatch(groupActions.validateGroupCreation());
        },

        setGroupName: (value) => {
            dispatch(groupActions.setGroupName(value));
        },

        setSelectedMembers: (groupId) => {
            dispatch(groupActions.setSelectedMembers(groupId));
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
ManageGroup.propTypes = {
    admin: PropTypes.string,
    searchResult: PropTypes.array,
    selectedUsers: PropTypes.array,
    proceedWithGroupCreation: PropTypes.bool,
    userGroups: PropTypes.object,
    defaultGroup: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageGroup);