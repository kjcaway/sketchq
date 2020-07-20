import { combineReducers } from 'redux';
import { userReducer as user } from './user';
import { websocketReducer as websocket } from './websocket';


const rootReducer = combineReducers({
  user,
  websocket
})

export default rootReducer