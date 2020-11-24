import { DialogContentText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as base from '../../store/reducer/base';


function CommonConfirm() {
  const isShow = useSelector((store: any) => store.base.confirm.isShow);
  const title = useSelector((store: any) => store.base.confirm.title);
  const contents = useSelector((store: any) => store.base.confirm.contents);
  const dispatch = useDispatch();

  const handleClickClose = () => {
    dispatch({ type: base.CLOSE_CONFIRM })
  }

  const handleClickOk = () => {
    dispatch({ type: base.OK_CONFIRM })
  }

  const handleClickCancel = () => {
    dispatch({ type: base.CANCEL_CONFIRM })
  }

  return (
    <Dialog open={isShow} onClose={handleClickClose} aria-labelledby="dialog-title">
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {contents}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickOk} variant="outlined" color="primary">
          확인
        </Button>
        <Button onClick={handleClickCancel} variant="outlined" color="default">
          취소
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CommonConfirm
