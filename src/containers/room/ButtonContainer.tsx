import React, { useContext } from 'react'
import { Fab, ButtonGroup, Button, Tooltip } from '@material-ui/core'
import '../../App.css';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import * as game from '../../store/reducer/game';
import { WebSocketContext } from '../../hoc/WebSocketProvider';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';

function ButtonContainer() {
  const userId = useSelector((store: any) => store.websocket.userId, shallowEqual);
  const roomId = useSelector((store: any) => store.websocket.roomId, shallowEqual);
  const userRole = useSelector((store: any) => store.websocket.userRole, shallowEqual);
  const gameStatus = useSelector((store: any) => store.game.status, shallowEqual);
  const gameWord = useSelector((store: any) => store.game.word, shallowEqual);
  const ws = useContext(WebSocketContext);
  const dispatch = useDispatch();

  const handleClickStart = () => {
    dispatch({ 
      type: game.REQ_START_GAME, 
      payload: {
        id: userId,
        roomId: roomId
    }});
  }

  const pushStartSignal = () => {
    ws.current.send(JSON.stringify({
      messageType: "START",
      sender: { id: userId, roomId: roomId },
    }));
  }

  const handleClickExit = () =>{
    window.location.href = '/'
  }

  const handleClickClear = () =>{
    ws.current.send(JSON.stringify({
      messageType: "CLEAR",
      sender: { id: userId, roomId: roomId },
    }));
  }

  const handleClickChangeCreator = () =>{
    //TODO: 방장 변경 
    window.location.href = '/'
  }

  return (
    <div className="topBtnDiv">
      {
        gameStatus === 'RUNNING' ? pushStartSignal():null
      }
      {
        userRole === 1 ?
          // 방장
          gameStatus === 'RUNNING' ?
            <>
              <Fab color="primary" variant="extended">
                제시어: {gameWord}
              </Fab>
              <ButtonGroup color="primary" aria-label="outlined button group" className="tool">
                <Tooltip title="지우기" arrow>
                  <Button onClick={handleClickClear}><RefreshOutlinedIcon /></Button>
                </Tooltip>
                <Tooltip title="나가기" arrow>
                  <Button onClick={handleClickExit}><ExitToAppSharpIcon /></Button>
                </Tooltip>
              </ButtonGroup>
            </>
            :
            <>
              <Fab color="primary" variant="extended" onClick={handleClickStart} className="action">
                시작하기
              </Fab>
              <ButtonGroup color="primary" aria-label="outlined button group" className="tool">
                <Tooltip title="지우기" arrow>
                  <Button onClick={handleClickClear}><RefreshOutlinedIcon /></Button>
                </Tooltip>
                <Tooltip title="권한 넘기기" arrow>
                  <Button onClick={handleClickChangeCreator}><GroupOutlinedIcon /></Button>
                </Tooltip>
                <Tooltip title="나가기" arrow>
                  <Button onClick={handleClickExit}><ExitToAppSharpIcon /></Button>
                </Tooltip>
              </ButtonGroup>
            </>
          :
          // 참가자
          gameStatus === 'RUNNING' ?
            <>
              <Fab color="default" variant="extended">
                무엇일까요?
              </Fab>
              <ButtonGroup color="primary" aria-label="outlined button group" className="tool">
                <Tooltip title="나가기" arrow>
                  <Button onClick={handleClickExit}><ExitToAppSharpIcon /></Button>
                </Tooltip>
              </ButtonGroup>
            </>
            :
            <>
              <Fab color="default" variant="extended">
                대기 중
              </Fab>
              <ButtonGroup color="primary" aria-label="outlined button group" className="tool">
                <Tooltip title="나가기" arrow>
                  <Button onClick={handleClickExit}><ExitToAppSharpIcon /></Button>
                </Tooltip>
              </ButtonGroup>
            </>
      }
    </div>
  )
}

export default ButtonContainer
