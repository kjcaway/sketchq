import { call, put, select, takeEvery, delay, throttle, debounce, take } from "redux-saga/effects";
import defaultClient from "../../lib/defaultClient";
import { history } from '../configureStore';
import * as draw from '../reducer/draw';
import * as user from '../reducer/user';
import * as websocket from '../reducer/websocket';
import * as game from '../reducer/game';
import * as base from '../reducer/base';

function* messageHandler(action: websocket.ActionType){
  try{
    const message = action.payload;
    const myId = yield select((state) => state.websocket.userId)
    const myRole = yield select((state) => state.websocket.userRole)
    switch(message.messageType){
      case 'JOIN':
        if(message.sender.id !== myId){
          // sender가 다른 사람일 경우
          yield put(user.addUser(message.sender))
        }
        break;
      case 'LEAVE':
        yield put(user.removeUser(message.sender))
        break;
      case 'CHAT':
        message.sender.chat = message.chat
        yield put(user.chat(message.sender))
        yield delay(3500)
        message.sender.chat = undefined
        yield put(user.chat(message.sender))
        break;
      case 'DRAW':
        if(message.sender.id !== myId && myRole === 2){
          // sender가 다른 사람일 경우
          yield put(draw.draw(message.drawing as draw.Drawing))
        }
        break;
      case 'START':
        if(message.sender.id !== myId && myRole === 2){
          // sender가 다른 사람일 경우
          yield put(game.startGame())
        }
        yield put(base.openAlert({
          category: 'info',
          contents: '게임을 시작합니다.'
        }))
        break;
      case 'HIT':
        yield put(user.hitWord(message.sender))
        yield put(base.openAlert({
          category: 'success',
          contents: `${message.sender.name}님 정답입니다.(정답 : ${message.chat})`
        }))
        yield delay(3000)
        yield put(game.ready())
        break;
      case 'CLEAR':
        yield put(draw.clear())
        break;
      case 'ROLECHANGE':
        // sender == creator
        yield put(user.changeRole(message.sender))
        if(message.sender.id !== myId){
          message.sender.role = 2
          yield put(websocket.setRole(message.sender))
        } else{
          message.sender.role = 1
          yield put(websocket.setRole(message.sender))
        }
        break;
      default:
        break;
    }
  } catch(error){
    yield put(base.openDialog({
      category: 'error',
      title: '알 수 없는 메시지 형태',
      contents: '알 수 없는 응답값이 전송되었습니다.',
    }));
  }
}

function* disconnect(action: websocket.ActionType){
  try{
    //TODO: leave myself case
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
    const name = action.payload;
    const roomName = name + '님의 방'
    const roomRes = yield call([defaultClient, 'post'], '/room',{
      roomName: roomName
    });
    const roomId = roomRes.data;
    
    yield put(websocket.reqCreateRoomSuccess(roomId));
    
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
    yield put(base.openDialog({
      category: 'error',
      title: '요청 실패',
      contents: 'API 요청에 실패했습니다.',
    }));
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
    yield put(base.openDialog({
      category: 'error',
      title: '요청 실패',
      contents: 'API 요청에 실패했습니다.',
    }));
  }
}

export default function* watchWebsocket() {
  yield takeEvery(websocket.ON_MESSAGE_SUCCESS, messageHandler);
  yield takeEvery(websocket.DISCONNECT, disconnect);
  yield takeEvery(websocket.REQ_CREATE_ROOM, reqCreateRoom);
  yield takeEvery(websocket.REQ_JOIN_ROOM, reqJoinRoom);
}