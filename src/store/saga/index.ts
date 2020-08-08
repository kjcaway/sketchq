import { spawn } from "redux-saga/effects";
import watchUser from './userSaga'

export default function* rootSaga() {
  yield spawn(watchUser);
}