import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      margin: '-35px'
    },
  }),
);

export default function ProgressCircle() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress size={70} />
    </div>
  );
}