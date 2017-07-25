import {createStore,applyMiddleware,combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import chatroomReducer from '../reducers/chatroomReducer';
import loginReducer from '../reducers/loginReducer';
import userListReducer from '../reducers/userListReducer';
import userGroupsReducer from '../reducers/userGroupsReducer';

export default createStore(combineReducers({chatroomReducer, loginReducer, userListReducer, userGroupsReducer}),
                           {},
                           applyMiddleware(createLogger()));
