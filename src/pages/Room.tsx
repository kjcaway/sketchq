import React from 'react';
import '../App.css';
import LayoutTemplate from '../components/LayoutTemplate';
import ActionBarContainer from '../containers/room/ActionBarContainer';
import ButtonContainer from '../containers/room/ButtonContainer';
import CanvasContainer from '../containers/room/CanvasContainer';
import UserContainer from '../containers/room/UserContainer';
import WebSocketProvider from '../hoc/WebSocketProvider';

function Room() {
  return (
    <LayoutTemplate maxWidth='xl'>
      <WebSocketProvider>
        <React.Fragment>
          <h5 className="roomTitle">Room.111</h5>
          <ButtonContainer />
          <UserContainer />
          <CanvasContainer />
          <ActionBarContainer />
        </React.Fragment>
      </WebSocketProvider>
    </LayoutTemplate>
  )
}

export default Room
