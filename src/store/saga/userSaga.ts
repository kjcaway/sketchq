import { call, put, takeEvery } from "redux-saga/effects";
import defaultClient from "../../lib/defaultClient";
import * as user from '../reducer/user';
import * as base from '../reducer/base';


function* reqUserList(action: user.ActionType){
  try {
    const roomId = action.payload.roomId;

    const usersRes = yield call([defaultClient, 'get'], `/users?roomId=${roomId}`,);
    const userList = usersRes.data as Array<any>;
    yield put(user.reqUserListSuccess(userList))
  } catch(error){
    yield put(base.openDialog({
      category: 'error',
      title: '요청 실패',
      contents: 'API 요청에 실패했습니다.',
    }));
  }
}

export default function* watchUser() {
  yield takeEvery(user.REQ_USER_LIST, reqUserList);
}
