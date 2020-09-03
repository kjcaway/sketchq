import { Badge, Button, ClickAwayListener, makeStyles, Tooltip } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import ThumbUpAltTwoToneIcon from '@material-ui/icons/ThumbUpAltTwoTone';
import React, { useEffect, useMemo, memo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../App.css';
import * as user from '../../store/reducer/user';


const useStyles = makeStyles((theme) => ({
  customWidth: {
    maxWidth: 100
  },
  userBtn: {
    textTransform: 'none'
  },
  mine: {
    fontWeight: 'bold'
  }
}));

function getUserList(users: any) {
  return users;
}

function UserContainer(props: any) {
  const classes = useStyles();
  const userList = useSelector((store: any) => store.user.userList, shallowEqual)
  const hitUserId = useSelector((store: any) => store.user.hitUserId, shallowEqual)
  const websocketStatus = useSelector((store: any) => store.websocket.status, shallowEqual)
  const userId = useSelector((store: any) => store.websocket.userId, shallowEqual)
  const dispatch = useDispatch();
  const { roomId } = props.match.params;
  
  useEffect(() => {
    /** User list 조회 */
    dispatch({type: user.REQ_USER_LIST, payload: {
      roomId: roomId
    }})
    
    
    return () => {
      /** useEffect clean */
    };
    // eslint-disable-next-line
  }, [websocketStatus])

  const handleTooltipClose = () => {
  };

  const UserItem = React.memo(function UserItem(props: {user: user.User, key: string, hit: string}) {
    const isOpen = props.user.chat?true:false;
    const chat = props.user.chat?props.user.chat:'';
    const name = props.user.name;
    const role = props.user.role;
    const id = props.user.id;
    const hit = props.hit;

    return (
      <li>
        <div>
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
            <Button className={classes.userBtn} size="small" startIcon={id === hit?<ThumbUpAltTwoToneIcon />:<PersonIcon />} >
              {
                role === 1?
                <Badge color="primary" variant="dot" >
                  <span className={userId === id?classes.mine:''}>{name}</span>
                </Badge>
                :
                <span className={userId === id?classes.mine:''}>{name}</span>
              }
            </Button>
          </Tooltip>
        </div>
      </li>
    )
  })
  
  const memUserList = useMemo(() => getUserList(userList), [userList]);

  return (
    <React.Fragment>
      <div className="chatContainerL">
        <ul className="usersL">
          {memUserList
            .filter((user: user.User, idx: number) => idx % 2 === 0)
            .map((user: user.User, idx: number) => {
              return (
                <UserItem user={user} key={user.id} hit={hitUserId}/>
              )
            })}
        </ul>
      </div>
      <div className="chatContainerR">
        <ul className="usersR">
          {memUserList
            .filter((user: user.User, idx: number) => idx % 2 === 1)
            .map((user: user.User, idx: number) => {
              return (
                <UserItem user={user} key={user.id} hit={hitUserId}/>
              )
            })}
        </ul>
      </div>
    </React.Fragment>
  )
}

export default withRouter(React.memo(UserContainer))
