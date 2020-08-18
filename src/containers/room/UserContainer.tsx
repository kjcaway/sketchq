import { Badge, Button, ClickAwayListener, makeStyles, Tooltip } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import '../../App.css';
import * as user from '../../store/reducer/user';


const useStyles = makeStyles((theme) => ({
  customWidth: {
    maxWidth: 100
  },
  userBtn: {
    textTransform: 'none'
  }
}));

function UserContainer(props: any) {
  const classes = useStyles();
  const userList = useSelector((store: any) => store.user.userList, shallowEqual)
  const websocketStatus = useSelector((store: any) => store.websocket.status, shallowEqual)
  const dispatch = useDispatch();
  const { roomId } = props.match.params;

  useEffect(() => {
    dispatch({type: user.REQ_USER_LIST, payload: {
      roomId: roomId
    }})

    return () => {
      /** useEffect clean */
      // Mount 해제시 상태 초기화
      dispatch({ type: user.ADD_USERS, payload: [] }); //TODO:
    };
    // eslint-disable-next-line
  }, [websocketStatus])

  const handleTooltipClose = () => {
  };

  const UserItem = (props: {user: user.User, key:String}) => {
    const isOpen = props.user.chat?true:false;
    const chat = props.user.chat?props.user.chat:'';
    const userName = props.user.name;

    return (
      <li>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            title={chat}
            arrow
            classes={{ tooltip: classes.customWidth }}
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={isOpen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            placement="right-start">
            <Button className={classes.userBtn} size="small" startIcon={<PersonIcon />} >
              <Badge color="error" variant="dot" >
                {userName}
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
                <UserItem user={user} key={user.id} />
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
                <UserItem user={user} key={user.id} />
              )
            })}
        </ul>
      </div>
    </React.Fragment>
  )
}

export default UserContainer
