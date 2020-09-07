import { call, put, takeEvery } from "redux-saga/effects";
import defaultClient from "../../lib/defaultClient";
import * as room from '../reducer/room';
import * as base from '../reducer/base';


function* reqRoomList(action: room.ActionType){
  try {
    const res = yield call([defaultClient, 'get'], `/rooms`);
    const data = res.data;
    yield put(room.reqRoomListSuccess(data));
  } catch(error){
    yield put(base.openDialog({
      type: 'error',
      title: '요청 실패',
      contents: 'API 요청에 실패했습니다.',
    }));
  }
  
}

export default function* watchRoom() {
  yield takeEvery(room.REQ_ROOM_LIST, reqRoomList);
}
