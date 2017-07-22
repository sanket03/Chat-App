import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import config from '../utilities/config';
import actions from '../actions/userActions.js';
import UserListInterface from '../components/userListInterface';

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.socket = config.socket;
        this.url = config.url;
    }

    componentDidMount() {
        let {updateActiveUsersList, initializeActiveUsersList, nickname} = this.props;

        // Fetch current list of active users
        fetch(this.url + '/api/getActiveUsersList', {method: 'get'})
            .then((res) => {
                res.json().then((usersList) => {
                        initializeActiveUsersList(usersList, nickname);
                }) 
            });
        
        // update active user list on client side
        this.socket.on('newUserJoined', (connectedUser) => {
            updateActiveUsersList(connectedUser);
        });
    }

    render() {
        return(
            <UserListInterface activeUsersList = {this.props.activeUsersList}/>
        )
    }
}

const mapStateToProps  = ({userListReducer,loginReducer}) =>  {
    return {
        activeUsersList: userListReducer.activeUsers,
        nickname: loginReducer.nickname
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateActiveUsersList: (connectedUser) => {
            dispatch(actions.updateActiveUsersList(connectedUser));
        },
        initializeActiveUsersList: (usersList,nickname) => {
            dispatch(actions.initializeActiveUsersList(usersList,nickname));
        }
    } 
}

// Typechecking for props
UserList.propTypes = {
    nickname: PropTypes.string,
    activeUsersList: PropTypes.array,
    initializeActiveUsersList: PropTypes.func,
    updateActiveUsersList: PropTypes.func
}


export default connect(mapStateToProps, mapDispatchToProps)(UserList);