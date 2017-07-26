import {createStore,applyMiddleware,combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import chatroomReducer from '../reducers/chatroomReducer';
import loginReducer from '../reducers/loginReducer';
import userGroupsReducer from '../reducers/userGroupsReducer';

export default createStore(combineReducers({chatroomReducer, loginReducer, userGroupsReducer}),
                           {},
                           applyMiddleware(createLogger()));
