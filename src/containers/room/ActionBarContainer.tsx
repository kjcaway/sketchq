import React, { useContext, useState } from 'react'
import { TextField, AppBar, makeStyles, Button, Toolbar } from '@material-ui/core'
import { shallowEqual, useSelector } from 'react-redux';
import { WebSocketContext } from '../../hoc/WebSocketProvider';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  input: {
    flexGrow: 1,
    marginRight: '2rem'
  },
}));

function ActionBarContainer() {
  const classes = useStyles();
  const userId = useSelector((store: any) => store.websocket.userId, shallowEqual);
  const roomId = useSelector((store: any) => store.websocket.roomId, shallowEqual);
  const ws = useContext(WebSocketContext);
  const [chatMessage, setChatMessage] = useState('');

  const handleClickSubmit = () => {
    ws.current.send(JSON.stringify({
      messageType: "CHAT",
      sender: { id: userId, roomId: roomId },
      chat: chatMessage
    }))

    setChatMessage('');
  }

  const handleChangeText = (e: any) => {
    setChatMessage(e.target.value);
  }

  return (
    <AppBar position="fixed" color="default" className={classes.appBar}>
      <Toolbar>
        <TextField size="small" className={classes.input} label="정답을 입력하세요." variant="outlined" value={chatMessage} onChange={handleChangeText} />
        <Button variant="contained" color="primary" onClick={handleClickSubmit}>전송</Button>
      </Toolbar>
    </AppBar>
  )
}

export default ActionBarContainer
