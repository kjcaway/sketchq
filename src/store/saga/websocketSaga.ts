import { put, takeEvery, call, select } from "redux-saga/effects";
import * as user from '../reducer/user';
import * as websocket from '../reducer/websocket';
import defaultClient from "../../lib/defaultClient";
import { history } from '../configureStore';

function* messageHandler(action: websocket.ActionType){
  try{
    const message = action.payload;
    switch(message.messageType){
      case 'JOIN':
        const myId = yield select((state) => state.websocket.userId)
        if(message.sender.id !== myId){
          // sender가 자기자신이면 무시
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
        //TODO:
        break;
      default:
        break;
    }
  } catch(error){

  }
}

function* disconnect(action: websocket.ActionType){
  try{
    //TODO:
    const userId = action.payload;
    const joinRes = yield call([defaultClient, 'post'], '/leave', {
      user: {
        id: userId
      }
    });
  } catch(error){

  }
}

function* reqCreateRoom(action: websocket.ActionType){
  try{
    const roomRes = yield call([defaultClient, 'post'], '/room');
    const roomId = roomRes.data;
    
    yield put(websocket.reqCreateRoomSuccess(roomId));
    
    const name = action.payload;
    const role = 1;
    const joinRes = yield call([defaultClient, 'post'], '/join', {
      name,
      roomId,
      role
    });

    const userId = joinRes.data;
    yield put(websocket.reqJoinRoomSuccess({
      id: userId,
      roomId: roomId,
      name: name,
      role: role
    }));

    yield call(() => history.push(`/room/${roomId}`));

  } catch(error){

  }
}

function* reqJoinRoom(action: websocket.ActionType){
  try{
    const user = action.payload;
    const role = 2;
    const joinRes = yield call([defaultClient, 'post'], '/join', {
      name: user.name,
      roomId: user.roomId,
      role: role
    });

    const userId = joinRes.data;
    yield put(websocket.reqJoinRoomSuccess({
      id: userId,
      roomId: user.roomId,
      name: user.name,
      role: role
    }));

    yield call(() => history.push(`/room/${user.roomId}`));

  } catch(error){

  }
}

export default function* watchWebsocket() {
  yield takeEvery(websocket.ON_MESSAGE_SUCCESS, messageHandler);
  yield takeEvery(websocket.DISCONNECT, disconnect);
  yield takeEvery(websocket.REQ_CREATE_ROOM, reqCreateRoom);
  yield takeEvery(websocket.REQ_JOIN_ROOM, reqJoinRoom);
}