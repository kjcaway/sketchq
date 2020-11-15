import { call, put, takeEvery } from "redux-saga/effects";
import defaultClient from "../../lib/defaultClient";
import * as game from '../reducer/game';
import * as base from '../reducer/base';


function* reqStart(action: game.ActionType){
  try {
    const user = action.payload
    const startRes = yield call([defaultClient, 'post'], `/start`, user);
    const data = startRes.data;
    yield put(game.reqStartGameSuccess(data));
  } catch(error){
    yield put(base.openDialog({
      type: 'error',
      title: '요청 실패',
      contents: 'API 요청에 실패했습니다.',
    }));
  }
}

function* reqChnageCreator(action: game.ActionType){
  try {
    const user = action.payload
    const res = yield call([defaultClient, 'post'], `/rolechange`, user);
    const data = res.data;
    yield put(game.reqChangeCreatorSuccess(data));
  } catch(error){
    yield put(base.openDialog({
      type: 'error',
      title: '요청 실패',
      contents: 'API 요청에 실패했습니다.',
    }));
  }
}

export default function* watchGame() {
  yield takeEvery(game.REQ_START_GAME, reqStart);
  yield takeEvery(game.REQ_CHANGE_CREATOR, reqChnageCreator);
}
