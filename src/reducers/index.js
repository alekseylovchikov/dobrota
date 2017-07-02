import { combineReducers } from 'redux';
import adsReducer from './adsReducer';

export default combineReducers({
  ads: adsReducer
});
