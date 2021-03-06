import { Badge, Button, createStyles, makeStyles, Theme, withStyles } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../App.css';
import * as user from '../../store/reducer/user';

const useStyles = makeStyles((theme) => ({
  userBtn: {
    textTransform: 'none',
  },
  mine: {
    fontWeight: 'bold'
  }
}));

// const ColorButton = withStyles((theme) => ({
//   root: {
//     color: theme.palette.getContrastText(green[500]),
//     backgroundColor: green[500],
//     '&:hover': {
//       backgroundColor: green[700],
//     },
//   },
// }))(Button);

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      fontSize: 9
    },
  }),
)(Badge);

function UserContainer(props: any) {
  const classes = useStyles();
  const userList = useSelector((store: any) => store.user.userList, shallowEqual)
  const hitUserId = useSelector((store: any) => store.user.hitUserId, shallowEqual)
  const websocketStatus = useSelector((store: any) => store.websocket.status, shallowEqual)
  const myId = useSelector((store: any) => store.websocket.userId, shallowEqual)
  const dispatch = useDispatch();
  const { roomId } = props.match.params;

  useEffect(() => {
    /** User list 조회 */
    dispatch({
      type: user.REQ_USER_LIST, payload: {
        roomId: roomId
      }
    })


    return () => {
      /** useEffect clean */
    };
    // eslint-disable-next-line
  }, [websocketStatus])

  const UserItem = React.memo(function UserItem(props: { user: user.User, key: string, hit: string, pos: string }) {
    const isOpen = props.user.chat ? true : false;
    const chat = props.user.chat ? props.user.chat : '';
    const name = props.user.name;
    const role = props.user.role;
    const id = props.user.id;

    return (
      <li>
        {
          (isOpen && props.pos === 'right') &&
          <div className={'balloon ' + props.pos}>
            <span>{chat}</span>
          </div>
        }
        {
          <Button className={classes.userBtn} size="small" startIcon={myId === id ? <PersonIcon /> : <PersonOutlineOutlinedIcon />} >
            {
              role === 1 ?
                <StyledBadge color="secondary" badgeContent="K">
                  <span className={myId === id ? classes.mine : ''}>{name}</span>
                </StyledBadge>
                :
                <span className={myId === id ? classes.mine : ''}>{name}</span>
            }
          </Button>
        }
        {
          (isOpen && props.pos === 'left') &&
          <div className={'balloon ' + props.pos}>
            <span>{chat}</span>
          </div>
        }
      </li>
    )
  })

  return (
    <React.Fragment>
      <div className="chatContainerL">
        <ul className="usersL">
          {userList
            .filter((user: user.User, idx: number) => idx % 2 === 0)
            .map((user: user.User, idx: number) => {
              return (
                <UserItem user={user} key={user.id} hit={hitUserId} pos="left" />
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
                <UserItem user={user} key={user.id} hit={hitUserId} pos="right" />
              )
            })}
        </ul>
      </div>
    </React.Fragment>
  )
}

export default withRouter(React.memo(UserContainer))
