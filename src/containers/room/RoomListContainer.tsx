import { IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import InfoIcon from '@material-ui/icons/Info';
import MeetingRoomTwoToneIcon from '@material-ui/icons/MeetingRoomTwoTone';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { history } from '../../store/configureStore';
import * as room from '../../store/reducer/room';

function RoomListContainer() {
  const roomList = useSelector((store: any) => store.room.roomList, shallowEqual);
  const dispatch = useDispatch();


  useEffect(() => {
    /** User list 조회 */
    dispatch({ type: room.REQ_ROOM_LIST })


    return () => {
      /** useEffect clean */
    };
    // eslint-disable-next-line
  }, [])

  const handleClickEnterRoom = (id: string) => {
    history.push(`/room/${id}`)
  }

  const handleClickBack = () => {
    history.push('/')
  }
  
  return (
    <>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        참가 가능한 방 목록
      </Typography>
      {
        roomList.length === 0?
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="방이 존재하지 않습니다."/>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="back" onClick={handleClickBack}>
                <ArrowBackIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        :
        <List component="nav" aria-label="main mailbox folders">
          {roomList
            .map((room: room.Room, idx: number) => {
              return (
                <ListItem button key={room.id}>
                  <ListItemIcon>
                    <MeetingRoomTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary={room.roomName} secondary={room.created}/>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="back" onClick={() => handleClickEnterRoom(room.id)}>
                      <Typography variant="button" align="center" color="textSecondary" paragraph>
                        참가하기
                      </Typography>
                      <DirectionsRunIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
        </List>
      }
    </>
  )
}

export default RoomListContainer
