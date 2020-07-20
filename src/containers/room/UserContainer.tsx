import { Badge, Button, ClickAwayListener, makeStyles, Tooltip } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import React, { useContext } from 'react';
import '../../App.css';
import { WebSocketContext } from '../../hoc/WebSocketProvider';


const useStyles = makeStyles((theme) => ({
  customWidth: {
    maxWidth: 100,
  },
}));

function UserContainer() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const ws = useContext(WebSocketContext);

  const handleTooltipClose = () => {
    /** Websocket send example */
    ws.current.send(JSON.stringify({
      messageType: "JOIN",
      sender: "kang"
    }));

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


  return (
    <React.Fragment>
      <div className="chatContainerL">
        <ul className="usersL">
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
                <Button size="small" startIcon={<PersonIcon />} onClick={handleTooltipOpen}>
                  <Badge color="error" variant="dot" >
                    강팔자
                    </Badge>
                </Button>
              </Tooltip>
            </ClickAwayListener>
          </li>
        </ul>
      </div>
      <div className="chatContainerR">
        <ul className="usersR">
          <li>
            <ClickAwayListener onClickAway={handleTooltipClose2}>
              <Tooltip
                title="안녕하세요."
                arrow
                classes={{ tooltip: classes.customWidth }}
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose2}
                open={open2}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                placement="right-start">
                <Button size="small" startIcon={<PersonIcon />} onClick={handleTooltipOpen2}>
                  김호중
                    </Button>
              </Tooltip>
            </ClickAwayListener>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}

export default UserContainer
