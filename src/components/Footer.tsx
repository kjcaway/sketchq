import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(4),
  }
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        이용시 불편사항은 아래로 연락바랍니다.
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        <Link color="inherit" href="#">
          whdckstngh@naver.com
        </Link>{' '}
      </Typography>
    </footer>
  )
}

export default Footer
