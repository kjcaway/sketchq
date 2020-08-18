import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

function RoomRoute({ component, ...rest }: any) {
  const userId = useSelector((store: any) => store.websocket.userId, shallowEqual);
  const roomId = useSelector((store: any) => store.websocket.roomId, shallowEqual);
  const { computedMatch } = rest;
  const paramRoomId = computedMatch.params.roomId;
  const finalRoomId = roomId?roomId:paramRoomId;
  return (
    <Route {...rest} render={(props) => {
      if (!userId) {
        return <Redirect to={{ pathname: '/' }} /> //TODO: 이름을 입력할 페이지
      } else if(!finalRoomId){
        return <Redirect to={{ pathname: '/error' }} />
      } else{
        return React.createElement(component, props)
      }
    }} />
  )
}

export default RoomRoute
