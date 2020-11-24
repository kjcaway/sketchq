import { put, race, take } from "redux-saga/effects";
import * as base from "../reducer/base";

export function* confirm(payload: any) {
  yield put(base.openConfirm(payload));

  const { ok } = yield race({
    ok: take(base.OK_CONFIRM),
    cancel: take(base.CANCEL_CONFIRM)
  })

  yield put(base.closeConfirm());

  return Boolean(ok)
}
