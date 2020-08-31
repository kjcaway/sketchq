import { combineReducers } from 'redux';
import { userReducer as user } from './user';
import { websocketReducer as websocket } from './websocket';
import { drawReducer as draw } from './draw';
import { gameReducer as game } from './game';


const rootReducer = combineReducers({
  user,
  websocket,
  draw,
  game
})

export default rootReducer