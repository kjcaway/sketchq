import { call, put, takeEvery } from "redux-saga/effects";
import defaultClient from "../../lib/defaultClient";
import * as user from '../reducer/user';


function* reqUserList(action: user.ActionType){
  try {
    const roomId = action.payload.roomId;

    const usersRes = yield call([defaultClient, 'get'], `/users?roomId=${roomId}`,);
    const userList = usersRes.data as Array<any>;
    yield put(user.addUsers(userList))
  } catch(error){
  }
}

export default function* watchUser() {
  yield takeEvery(user.REQ_USER_LIST, reqUserList);
}
