import React from 'react'
import { Route, Redirect } from 'react-router'
import { useSelector, shallowEqual } from 'react-redux'
import ProgressCircle from '../components//ProgressCircle'

function ProtectedRoute({ component, ...rest }: any) {
  const userId = useSelector((store: any) => store.websocket.userId, shallowEqual);
  const roomId = useSelector((store: any) => store.websocket.roomId, shallowEqual);
  const { computedMatch } = rest;
  const paramRoomId = computedMatch.params.roomId;

  return (
    <Route {...rest} render={(props) => {
      if (!userId && !roomId) {
        return <ProgressCircle />
      } else{
        return React.createElement(component, props)
      }
    }} />
  )
}

export default ProtectedRoute
