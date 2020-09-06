import { call, put, takeEvery } from "redux-saga/effects";
import defaultClient from "../../lib/defaultClient";
import * as room from '../reducer/room';


function* reqRoomList(action: room.ActionType){
  try {
    const res = yield call([defaultClient, 'get'], `/rooms`);
    const data = res.data;
    yield put(room.reqRoomListSuccess(data));
  } catch(error){
  }
}

export default function* watchRoom() {
  yield takeEvery(room.REQ_ROOM_LIST, reqRoomList);
}
