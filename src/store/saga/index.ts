import { spawn } from "redux-saga/effects";
import watchUser from './userSaga'
import watchWebsocket from './websocketSaga'

export default function* rootSaga() {
  yield spawn(watchUser);
  yield spawn(watchWebsocket);
}