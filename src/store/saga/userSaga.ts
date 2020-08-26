import { call, put, takeEvery } from "redux-saga/effects";
import defaultClient from "../../lib/defaultClient";
import * as user from '../reducer/user';


/** Deprecated */
function* fetchReqJoin(action: user.ActionType){
  try {
    if(!sessionStorage.getItem('myId')){
      const { name, roomId } = action.payload;
      const joinRes = yield call([defaultClient, 'post'], '/join', {
        name,
        roomId
      });
      yield put(user.reqJoinSuccess(joinRes.data));
      sessionStorage.setItem('myId', joinRes.data);
    }

    const usersRes = yield call([defaultClient, 'get'], '/users?roomId=101',);
    const userList = usersRes.data as Array<any>;
    yield put(user.addUsers(userList))
  } catch(error){
    yield put(user.reqJoinFail(error));
  }
}

function* reqUserList(action: user.ActionType){
  try {
    const roomId = action.payload.roomId;

    const usersRes = yield call([defaultClient, 'get'], `/users?roomId=${roomId}`,);
    const userList = usersRes.data as Array<any>;
    yield put(user.addUsers(userList))
  } catch(error){
    yield put(user.reqJoinFail(error));
  }
}

export default function* watchUser() {
  yield takeEvery(user.REQ_JOIN, fetchReqJoin);
  yield takeEvery(user.REQ_USER_LIST, reqUserList);
}
