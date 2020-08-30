import { combineReducers } from 'redux';
import { userReducer as user } from './user';
import { websocketReducer as websocket } from './websocket';
import { drawReducer as draw } from './draw';


const rootReducer = combineReducers({
  user,
  websocket,
  draw
})

export default rootReducer