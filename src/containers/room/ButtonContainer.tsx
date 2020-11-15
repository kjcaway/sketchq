import React, { useContext } from 'react'
import clsx from 'clsx';
import { Fab, ButtonGroup, Button, Tooltip, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem, Avatar, makeStyles } from '@material-ui/core'
import '../../App.css';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import * as game from '../../store/reducer/game';
import { WebSocketContext } from '../../hoc/WebSocketProvider';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { red, green, blue} from '@material-ui/core/colors'
import * as draw from '../../store/reducer/draw';

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
  menuPop: {
    zIndex: 500
  }
}));

function ButtonContainer() {
  const classes = useStyles();
  const userId = useSelector((store: any) => store.websocket.userId, shallowEqual);
  const roomId = useSelector((store: any) => store.websocket.roomId, shallowEqual);
  const userRole = useSelector((store: any) => store.websocket.userRole, shallowEqual);
  const gameStatus = useSelector((store: any) => store.game.status, shallowEqual);
  const gameWord = useSelector((store: any) => store.game.word, shallowEqual);
  const drawColor = useSelector((store: any) => store.draw.color, shallowEqual);
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

  const handleClickExit = () =>{
    window.location.href = '/'
  }

  const handleClickClear = () =>{
    ws.current.send(JSON.stringify({
      messageType: "CLEAR",
      sender: { id: userId, roomId: roomId },
    }));
  }

  const handleClickChangeCreator = () =>{
    dispatch({ 
      type: game.REQ_CHANGE_CREATOR, 
      payload: {
        id: userId,
        roomId: roomId
    }});
  }

  return (
    <div className="topBtnDiv">
      {
        gameStatus === 'REQUEST' ? pushStartSignal():null
      }
      {
        userRole === 1 ?
          // 방장
          gameStatus === 'RUNNING' ?
            <>
              <Fab color="primary" variant="extended">
                제시어: {gameWord}
              </Fab>
              <ButtonGroup variant="outlined" color="primary" ref={anchorRef} aria-label="split button">
                <Button>
                  <Avatar variant="square" className={clsx(classes.colorBox, classes[drawColor.toLowerCase() as draw.Color])} >
                    &nbsp;
                  </Avatar>
                  {drawColor}
                </Button>
                <Button
                  color="primary"
                  size="small"
                  aria-controls={open ? 'split-button-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-label="툴박스"
                  aria-haspopup="menu"
                  onClick={handleToggle}
                >
                  <ArrowDropDownIcon />
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
                                  {color}
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
