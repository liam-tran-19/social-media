import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

const RootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer
});

export default RootReducer
