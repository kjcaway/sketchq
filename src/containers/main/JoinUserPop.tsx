import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { history } from '../../store/configureStore';

interface Props {
  open: boolean;
  handleClose: () => void;
}

function JoinUserPop(props: Props) {
  const [userName, setUserName] = useState('');

  const handleSubmit = () => {
    localStorage.setItem("userName", userName);
    history.push('/room');
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-title">
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
        <Button onClick={props.handleClose} variant="contained" color="default">
          취소
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default JoinUserPop
