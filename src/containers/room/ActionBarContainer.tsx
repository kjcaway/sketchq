import React, { useContext, useState } from 'react'
import { TextField, AppBar, makeStyles, Button } from '@material-ui/core'
import { shallowEqual, useSelector } from 'react-redux';
import { WebSocketContext } from '../../hoc/WebSocketProvider';

const useStyles = makeStyles((theme) => ({
  customWidth: {
    maxWidth: 100,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
}));

function ActionBarContainer() {
  const classes = useStyles();
  const myId = useSelector((store: any) => store.user.myId, shallowEqual);
  const ws = useContext(WebSocketContext);
  const [chatMessage, setChatMessage] = useState('');

  const handleClickSubmit = () => {
    ws.current.send(JSON.stringify({
      messageType: "CHAT",
      sender: { id: myId },
      chat: chatMessage
    }))
  }

  const handleChangeText = (e: any) => {
    setChatMessage(e.target.value);
  }

  return (
    <AppBar position="fixed" color="default" className={classes.appBar}>
      <TextField id="filled-basic" label="정답을 입력하세요." variant="filled" onChange={handleChangeText}/>
      <Button color="inherit" onClick={handleClickSubmit}>전송</Button>
    </AppBar>
  )
}

export default ActionBarContainer
