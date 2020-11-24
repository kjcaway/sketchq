import { Avatar, Button, ButtonGroup, ClickAwayListener, Fab, Grow, makeStyles, MenuItem, MenuList, Paper, Popper, Tooltip } from '@material-ui/core';
import { blue, green, red } from '@material-ui/core/colors';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import '../../App.css';
import { WebSocketContext } from '../../hoc/WebSocketProvider';
import * as base from '../../store/reducer/base';
import * as draw from '../../store/reducer/draw';
import * as game from '../../store/reducer/game';

const useStyles = makeStyles((theme) => ({
  colorBox: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  black: {
    backgroundColor: '#000000',
  },
  red: {
    backgroundColor: red[500],
  },
  green: {
    backgroundColor: green[500],
  },
  blue: {
    backgroundColor: blue[500],
  },
  white: {
    backgroundColor: '#ffffff',
  },
  menuPop: {
    zIndex: 500
  }
}));

function ButtonContainer() {
  const classes = useStyles();
  const myId = useSelector((store: any) => store.websocket.userId, shallowEqual);
  const myRole = useSelector((store: any) => store.websocket.userRole, shallowEqual);
  const roomId = useSelector((store: any) => store.websocket.roomId, shallowEqual);
  const gameStatus = useSelector((store: any) => store.game.status, shallowEqual);
  const gameWord = useSelector((store: any) => store.game.word, shallowEqual);
  const drawColor = useSelector((store: any) => store.draw.color, shallowEqual);
  const userList = useSelector((store: any) => store.user.userList, shallowEqual);
  const ws = useContext(WebSocketContext);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false); // tool menu open state
  const anchorRef = React.useRef<HTMLDivElement>(null);
  
  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    selectedColor: string,
  ) => {
    dispatch({type: draw.CHANGE_COLOR, payload: selectedColor})
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const handleClickStart = (event: React.MouseEvent<Document, MouseEvent>) => {
    dispatch({ 
      type: game.REQ_START_GAME, 
      payload: {
        id: myId,
        roomId: roomId
    }});
  }

  const pushStartSignal = () => {
    ws.current.send(JSON.stringify({
      messageType: "START",
      sender: { id: myId, roomId: roomId },
    }));
  }

  const handleClickExit = () =>{
    window.location.href = '/'
  }

  const handleClickClear = () =>{
    ws.current.send(JSON.stringify({
      messageType: "CLEAR",
      sender: { id: myId, roomId: roomId },
    }));
  }

  const handleClickChangeCreator = () =>{
    if(userList.length > 1){
      dispatch({ 
        type: game.REQ_CHANGE_CREATOR, 
        payload: {
          id: myId,
          roomId: roomId
      }});
    } else{
      dispatch({ 
        type: base.OPEN_ALERT, 
        payload: {
          category: "warning",
          contents: "다른 사람이 있어야 권한을 넘길수 있습니다."
      }});
    }
  }

  return (
    <div className="topBtnDiv">
      {
        gameStatus === 'REQUEST' ? pushStartSignal():null
      }
      {
        myRole === 1 ?
          // 방장
          gameStatus === 'RUNNING' ?
            <>
              <Fab color="primary" variant="extended">
                제시어: {gameWord}
              </Fab>
              <ButtonGroup variant="outlined" color="primary" ref={anchorRef} aria-label="split button">
                <Button
                  aria-controls={open ? 'split-button-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleToggle}
                >
                  <Avatar variant="square" className={clsx(classes.colorBox, classes[drawColor.toLowerCase() as draw.Color])} >
                    &nbsp;
                  </Avatar>
                </Button>
              </ButtonGroup>
              <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal className={classes.menuPop}>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu">
                          {
                            draw.colorList.map((color) => {
                              return (
                                <MenuItem
                                  key={color}
                                  selected={color === drawColor}
                                  onClick={(event) => handleMenuItemClick(event, color)}
                                >
                                  <Avatar variant="square" className={clsx(classes.colorBox, classes[color.toLowerCase() as draw.Color])} >
                                    &nbsp;
                                  </Avatar>
                                </MenuItem>
                              )
                            })
                          }
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
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
              <Fab color="primary" variant="extended" onClick={(event: any) => handleClickStart(event)} className="action">
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
