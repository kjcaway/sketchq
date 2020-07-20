import React from 'react'
import { TextField, AppBar, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  customWidth: {
    maxWidth: 100,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
}));

function ActionBarContainer() {
  const classes = useStyles();

  
  return (
    <AppBar position="fixed" color="default" className={classes.appBar}>
      <TextField id="filled-basic" label="정답을 입력하세요." variant="filled" />
    </AppBar>
  )
}

export default ActionBarContainer
