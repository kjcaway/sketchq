import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as websocket from '../../store/reducer/websocket';


//TODO: 추후 레이아웃 변경
function SetNameContainer(props: any) {
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  const { roomId } = props.match.params;

  const handleSubmit = () => {
    dispatch({type: websocket.REQ_JOIN_ROOM, payload: {
      name: userName,
      roomId: roomId
    }})
  }

  return (
    <Dialog open={true} onClose={() => {alert("불가합니다.")}} aria-labelledby="form-title">
      <DialogTitle id="form-title">이름설정</DialogTitle>
      <DialogContent>
        <DialogContentText>
          사용할 이름을 입력하세요.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="userName"
          name="userName"
          label="이름"
          type="text"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          시작
        </Button>
        <Button onClick={() => {alert("불가합니다.")}} variant="contained" color="default">
          취소
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withRouter(SetNameContainer);
