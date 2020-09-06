import React from 'react';
import '../App.css';
import LayoutTemplate from '../components/LayoutTemplate';
import RoomListContainer from '../containers/room/RoomListContainer';

function Room() {
  return (
    <LayoutTemplate maxWidth='xl'>
      <React.Fragment>
        <RoomListContainer />
      </React.Fragment>
    </LayoutTemplate>
  )
}

export default Room
