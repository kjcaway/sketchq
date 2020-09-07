import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { IconButton, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import * as base from '../../store/reducer/base';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  successColor: {
    backgroundColor: "#4caf50",
  },
  failColor: {
    backgroundColor: "#e00b1e",
  },
});

function CommonDialog() {
  const classes = useStyles();
  const isShow = useSelector((store: any) => store.base.isShow);
  const title = useSelector((store: any) => store.base.title);
  const contents = useSelector((store: any) => store.base.contents);
  const type = useSelector((store: any) => store.base.type);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: base.CLOSE_DIALOG })
    setTimeout(() => {
      dispatch({ type: base.INIT_DIALOG })
    }, 500)
  }

  return (
    <Dialog
      open={isShow}
      TransitionComponent={Transition}
      transitionDuration={500}
      keepMounted
      fullWidth={true}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title" className={type === 'success' ? classes.successColor : classes.failColor}>
        <Typography>
          <IconButton edge="start" color="inherit" >
            {
              type === 'success' ? <SentimentVerySatisfiedIcon /> : <SentimentVeryDissatisfiedIcon />
            }
          </IconButton>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" >
          {contents}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} variant="contained" color="default">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CommonDialog
