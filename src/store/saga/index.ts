import { spawn } from "redux-saga/effects";
import watchUser from './userSaga'
import watchWebsocket from './websocketSaga'
import watchGame from "./gameSaga";
import watchRoom from "./roomSaga";

export default function* rootSaga() {
  yield spawn(watchUser);
  yield spawn(watchWebsocket);
  yield spawn(watchGame);
  yield spawn(watchRoom);
}