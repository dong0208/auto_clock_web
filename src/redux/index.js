import { combineReducers } from 'redux';
import userInfoReducer from "./userInfoReducer";
import pageLoadingReducer from './pageLoadingReducer';
const Reducers = combineReducers({
  userInfoReducer,
  pageLoadingReducer
});

export default Reducers