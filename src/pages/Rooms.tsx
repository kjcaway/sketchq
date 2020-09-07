import React from 'react';
import '../App.css';
import LayoutTemplate from '../components/LayoutTemplate';
import RoomListContainer from '../containers/room/RoomListContainer';
import Base from '../containers/Base';

function Room() {
  return (
    <LayoutTemplate maxWidth='xl'>
      <React.Fragment>
        <RoomListContainer />
        <Base />
      </React.Fragment>
    </LayoutTemplate>
  )
}

export default Room
