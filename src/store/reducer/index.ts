import { combineReducers } from 'redux';
import { userReducer as user } from './user';
import { websocketReducer as websocket } from './websocket';
import { drawReducer as draw } from './draw';
import { gameReducer as game } from './game';
import { roomReducer as room } from './room';
import { baseReducer as base } from './base';


const rootReducer = combineReducers({
  user,
  websocket,
  draw,
  game,
  room,
  base
})

export default rootReducer