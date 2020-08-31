import React from 'react'
import { Fab } from '@material-ui/core'
import '../../App.css';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

function ButtonContainer() {
  const userId = useSelector((store: any) => store.websocket.userId, shallowEqual);
  const roomId = useSelector((store: any) => store.websocket.roomId, shallowEqual);
  const userRole = useSelector((store: any) => store.websocket.userRole, shallowEqual);
  const dispatch = useDispatch();

  const handleClickStart = () => {
    //TODO: dispatch request play game
  }
  return (
    <div className="start">
      {
        userRole === 1 ?
          <Fab color="primary" variant="extended" onClick={handleClickStart}>
            시작하기
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
