import { call, put, takeEvery } from "redux-saga/effects";
import defaultClient from "../../lib/defaultClient";
import * as game from '../reducer/game';


function* reqStart(action: game.ActionType){
  try {
    const user = action.payload
    const startRes = yield call([defaultClient, 'post'], `/start`, user);
    const data = startRes.data;
    yield put(game.reqStartGameSuccess(data));
  } catch(error){
  }
}

export default function* watchGame() {
  yield takeEvery(game.REQ_START_GAME, reqStart);
}
