import { Badge, Button, ClickAwayListener, makeStyles, Tooltip } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import React, { useContext, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import '../../App.css';
import { WebSocketContext } from '../../hoc/WebSocketProvider';
import * as user from '../../store/reducer/user';


const useStyles = makeStyles((theme) => ({
  customWidth: {
    maxWidth: 100
  },
  userBtn: {
    textTransform: 'none'
  }
}));

function UserContainer() {
  const classes = useStyles();
  const userList = useSelector((store: any) => store.user.userList, shallowEqual)
  const myId = useSelector((store: any) => store.user.myId, shallowEqual)
  const websocketStatus = useSelector((store: any) => store.websocket.status, shallowEqual)
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);

  useEffect(() => {
    if (websocketStatus === 'SUCCESS') {
      if(localStorage.getItem("userName")){
        dispatch({ type: user.REQ_JOIN, payload: {
          name: localStorage.getItem("userName"),
          roomNum: 101
        }})
      }

      /*
      ws.current.onmessage = (evt: MessageEvent) => {
        const { messageType, sender, chat, drawing } = JSON.parse(evt.data)
        console.log(evt.data)
        if (messageType === 'JOIN') {
          dispatch({ type: ADD_USER_SUCCESS, payload: sender })
        }
      };
      ws.current.send(JSON.stringify({
        messageType: "JOIN",
        sender: userName
      }));
      */
    }

    return () => {
      /** useEffect clean */
      // Mount 해제시 상태 초기화
      dispatch({ type: user.ADD_USERS_SUCCESS, payload: [] }); 
      dispatch({ type: user.REQ_JOIN_SUCCESS, data: "" })
    };
    // eslint-disable-next-line
  }, [websocketStatus])

  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const [open2, setOpen2] = React.useState(false);

  const handleTooltipClose2 = () => {
    setOpen2(false);
  };

  const handleTooltipOpen2 = () => {
    setOpen2(true);
  };

  const UserItem = (props: any) => {
    return (
      <li>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            title="안녕하세요."
            arrow
            classes={{ tooltip: classes.customWidth }}
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            placement="right-start">
            <Button className={classes.userBtn} size="small" startIcon={<PersonIcon />} onClick={handleTooltipOpen}>
              <Badge color="error" variant="dot" >
                {props.name}
              </Badge>
            </Button>
          </Tooltip>
        </ClickAwayListener>
      </li>
    )
  }

  return (
    <React.Fragment>
      <div className="chatContainerL">
        <ul className="usersL">
          {userList
            .filter((user: user.User, idx: number) => idx % 2 === 0)
            .map((user: user.User, idx: number) => {
              return (
                <UserItem name={user.name} key={user.id} />
              )
            })}
        </ul>
      </div>
      <div className="chatContainerR">
        <ul className="usersR">
          {userList
            .filter((user: user.User, idx: number) => idx % 2 === 1)
            .map((user: user.User, idx: number) => {
              return (
                <UserItem name={user.name} key={user.id} />
              )
            })}
        </ul>
      </div>
    </React.Fragment>
  )
}

export default UserContainer
