import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import JoinUserPop from './JoinUserPop';

const useStyles = makeStyles((theme) => ({
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

function Intro() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const userId = useSelector((store: any) => store.websocket.userId, shallowEqual);

  const handleClickCreateRoom = () => {
    if(!userId){
      setOpen(true);
    } else{
      // setOpen(true);
    }
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <main>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        SketchQ
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        스케치큐는 그림 맞추기 게임 입니다. 방법은 간단합니다. 
        그냥 방장이 그리는 그림이 무엇인지 맞추면 됩니다. 
      </Typography>
      <div className={classes.heroButtons}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleClickCreateRoom}>
              방만들기
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary">
              아무방이나 참가
            </Button>
          </Grid>
        </Grid>
      </div>
      <JoinUserPop 
        open={open}
        handleClose={handleClose}
      />
    </main>
  )
}

export default Intro
