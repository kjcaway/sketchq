import React from 'react';
import '../App.css';
import LayoutTemplate from '../components/LayoutTemplate';
import ActionBarContainer from '../containers/room/ActionBarContainer';
import ButtonContainer from '../containers/room/ButtonContainer';
import CanvasContainer from '../containers/room/CanvasContainer';
import UserContainer from '../containers/room/UserContainer';
import WebSocketProvider from '../hoc/WebSocketProvider';
import Base from '../containers/Base';

function Room() {
  return (
    <LayoutTemplate maxWidth='xl'>
      <WebSocketProvider>
        <React.Fragment>
          <ButtonContainer />
          <UserContainer />
          <CanvasContainer />
          <ActionBarContainer />
          <Base />
        </React.Fragment>
      </WebSocketProvider>
    </LayoutTemplate>
  )
}

export default Room
