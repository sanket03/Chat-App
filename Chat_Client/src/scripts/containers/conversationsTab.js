import React from 'react';
import {Collapse, Button} from 'reactstrap';
import {connect} from 'react-redux';
import UserList from '../containers/userList';
import actions  from '../actions/userActions';

class ConversationsTab extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {toggleCollapse, isCollapsed} = this.props;
        return (
            <div id = 'conversations-tab'>
                <Button color = 'primary' onClick = {toggleCollapse}>Conversations</Button>
                <Collapse isOpen = {!isCollapsed}>
                    <UserList/>
                </Collapse>            
            </div>
        );
    }
}

let mapStateToProps = ({conversationListReducer}) => {
    return {
        isCollapsed: conversationListReducer.isCollapsed
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        toggleCollapse: () => {
            dispatch(actions.toggleCollapse());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsTab);
