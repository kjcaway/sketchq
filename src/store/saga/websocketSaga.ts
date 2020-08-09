import { put, takeEvery } from "redux-saga/effects";
import * as user from '../reducer/user';
import * as websocket from '../reducer/websocket';

function* messageHandler(action: websocket.ActionType){
  try{
    const message = action.payload;
    switch(message.messageType){
      case 'JOIN':
        yield put(user.addUser(message.sender))
        break;
      case 'LEAVE':
        yield put(user.removeUser(message.sender))
        break;
      case 'CHAT':
        yield put(user.chat(message.sender, message.chat))
        break;
      case 'DRAW':
        // TODO:
        break;
      default:
        break;
    }
  } catch(error){

  }
}

export default function* watchWebsocket() {
  yield takeEvery(websocket.ON_MESSAGE_SUCCESS, messageHandler);
}