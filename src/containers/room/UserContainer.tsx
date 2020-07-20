import { Badge, Button, ClickAwayListener, makeStyles, Tooltip, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import React, { useContext, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import '../../App.css';
import { WebSocketContext } from '../../hoc/WebSocketProvider';
import { ADD_USER_SUCCESS } from '../../store/reducer/user'


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
  const websocketStatus = useSelector((store: any) => store.websocket.status, shallowEqual)
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);

  useEffect(() => {
    const userName = "kang"

    if (websocketStatus == 'SUCCESS') {
      ws.current.onmessage = (evt: MessageEvent) => {
        const { messageType, sender, chat, drawing } = JSON.parse(evt.data)
        console.log(evt.data)
        if (messageType == 'JOIN') {
          dispatch({ type: ADD_USER_SUCCESS, payload: sender })
        }
      };
      ws.current.send(JSON.stringify({
        messageType: "JOIN",
        sender: userName
      }));
    }

    return () => {
      /** useEffect clean */
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
            .filter((userName: string, idx: number) => idx % 2 == 0)
            .map((userName: string, idx: number) => {
              return (
                <UserItem name={userName} key={idx} />
              )
            })}
        </ul>
      </div>
      <div className="chatContainerR">
        <ul className="usersR">
          {userList
            .filter((userName: string, idx: number) => idx % 2 == 1)
            .map((userName: string, idx: number) => {
              return (
                <UserItem name={userName} key={idx} />
              )
            })}
        </ul>
      </div>
    </React.Fragment>
  )
}

export default UserContainer
