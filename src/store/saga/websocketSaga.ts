import { put, takeEvery, call } from "redux-saga/effects";
import * as user from '../reducer/user';
import * as websocket from '../reducer/websocket';
import defaultClient from "../../lib/defaultClient";

function* messageHandler(action: websocket.ActionType){
  try{
    const message = action.payload;
    switch(message.messageType){
      case 'JOIN':
        if(message.sender.id !== sessionStorage.getItem('myId')){
          yield put(user.addUser(message.sender))
        }
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

function* disconnect(action: websocket.ActionType){
  try{
    const userId = action.payload;
    const joinRes = yield call([defaultClient, 'post'], '/leave', {
      user: {
        id: userId
      }
    });
  } catch(error){

  }
}

export default function* watchWebsocket() {
  yield takeEvery(websocket.ON_MESSAGE_SUCCESS, messageHandler);
  yield takeEvery(websocket.DISCONNECT, disconnect);
}