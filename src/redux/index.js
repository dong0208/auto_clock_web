import { combineReducers } from 'redux';
import userInfoReducer from "./userInfoReducer";
import shopInfoReducer from "./shopInfoReducer";
import menuReducer from "./menuReducer";
import shopListReducer from "./shopListReducer";
import pageLoadingReducer from "./pageLoadingReducer";
import authorityListReducer from "./authorityListReducer";

const Reducers = combineReducers({
  userInfoReducer,
  shopInfoReducer,
  menuReducer,
  shopListReducer,
  pageLoadingReducer,
  authorityListReducer
});

export default Reducers