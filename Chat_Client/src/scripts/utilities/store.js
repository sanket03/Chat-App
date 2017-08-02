import {createStore,applyMiddleware,combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import chatroomReducer from '../reducers/chatroomReducer';
import loginReducer from '../reducers/loginReducer';
import conversationListReducer from '../reducers/conversationListReducer';

export default createStore(combineReducers({chatroomReducer, loginReducer, conversationListReducer}),
                           {},
                           applyMiddleware(createLogger()));
