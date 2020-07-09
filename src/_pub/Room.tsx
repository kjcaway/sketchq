import React from 'react'
import LayoutTemplate from '../components/LayoutTemplate';
import '../App.css'

import PersonIcon from '@material-ui/icons/Person';
import { Box, Badge, Typography, Button, Tooltip, ClickAwayListener, makeStyles, AppBar, Input, TextField, Fab } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  customWidth: {
    maxWidth: 100,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
}));

function Room() {
  const classes = useStyles();
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

  return (
    <LayoutTemplate maxWidth='xl'>
      <React.Fragment>
        <h5 className="roomTitle">Room.111</h5>
        <div className="start">
          <Fab color="primary" variant="extended">
            START!
          </Fab>
        </div>
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

        <canvas className="canvas" />

        <AppBar position="fixed" color="default" className={classes.appBar}>
          <TextField id="filled-basic" label="정답을 입력하세요." variant="filled" />
        </AppBar>
      </React.Fragment>
    </LayoutTemplate>
  )
}

export default Room
