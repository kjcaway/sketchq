import { call, put, takeEvery, select } from "redux-saga/effects";
import defaultClient from "../../lib/defaultClient";

import * as user from '../reducer/user'

function* fetchReqJoin(action: user.ActionType){
  try {
    const myId = yield select((state) => state.user.myId);
    if(!myId){
      const { name, roomNum } = action.payload;
      const joinRes = yield call([defaultClient, 'post'], '/join', {
        name,
        roomNum
      });
      yield put(user.reqJoinSuccess(joinRes.data));
    }

    const usersRes = yield call([defaultClient, 'get'], '/users?roomNum=101',);
    const userList = usersRes.data as Array<any>;
    yield put(user.addUsers(userList))
  } catch(error){
    yield put(user.reqJoinFail(error));
  }
}

export default function* watchUser() {
  yield takeEvery(user.REQ_JOIN, fetchReqJoin);
}
