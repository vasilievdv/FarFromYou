import { combineReducers } from 'redux';
import loaderReducer from './loaderReducer';
import userReducer from './userReducer';
import audioReducer from './audioReducer';

const rootReducer = combineReducers({
  user: userReducer,
  loader: loaderReducer,
  audio: audioReducer,
});

export default rootReducer;
