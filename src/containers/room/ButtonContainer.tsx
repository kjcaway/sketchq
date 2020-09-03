import React, { useContext } from 'react'
import { Fab } from '@material-ui/core'
import '../../App.css';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import * as game from '../../store/reducer/game';
import { WebSocketContext } from '../../hoc/WebSocketProvider';

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

  return (
    <div className="topBtnDiv">
      {
        gameStatus === 'RUNNING' ? pushStartSignal():null
      }
      {
        userRole === 1 ?
          gameStatus === 'RUNNING' ?
            <>
              <Fab color="primary" variant="extended">
                제시어: {gameWord}
              </Fab>
              <Fab color="default" variant="extended" size="small" className="tool">
                모두 지우기
              </Fab>
            </>
            :
            <Fab color="primary" variant="extended" onClick={handleClickStart}>
              시작하기
            </Fab>
          :
          gameStatus === 'RUNNING' ?
            <Fab color="default" variant="extended">
              무엇일까요?
            </Fab>
            :
            <Fab color="default" variant="extended">
              대기중
            </Fab>
      }
    </div>
  )
}

export default ButtonContainer
