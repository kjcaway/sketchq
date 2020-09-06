import { combineReducers } from 'redux';
import { userReducer as user } from './user';
import { websocketReducer as websocket } from './websocket';
import { drawReducer as draw } from './draw';
import { gameReducer as game } from './game';
import { roomReducer as room } from './room';


const rootReducer = combineReducers({
  user,
  websocket,
  draw,
  game,
  room
})

export default rootReducer