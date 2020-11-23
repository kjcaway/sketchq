import { makeStyles, Theme, SnackbarContent, IconButton } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import { TransitionProps } from '@material-ui/core/transitions';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import clsx from 'clsx';
import * as base from '../../store/reducer/base';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// eslint-disable-next-line
enum category {
  success = 'success',
  warning = 'warning',
  error = 'error',
  info = 'info',
}

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function CommonAlert() {
  const classes = useStyles();
  const isShow = useSelector((store: any) => store.base.alert.isShow);
  const contents = useSelector((store: any) => store.base.alert.contents);
  const category = useSelector((store: any) => store.base.alert.category);
  const Icon = variantIcon[category as unknown as category] || null;
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch({ type: base.CLOSE_ALERT })
    setTimeout(() => {
      dispatch({ type: base.INIT_ALERT })
    }, 500)
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={isShow}
      TransitionComponent={Transition}
      message={contents}
      autoHideDuration={2500}
      onClose={onClose}
    >
      <SnackbarContent
        className={clsx(classes[category as unknown as category], category)}
        aria-describedby="client-snackbar"
        message={
          isShow ?
            <span id="client-snackbar" className={classes.message}>
              <Icon className={clsx(classes.icon, classes.iconVariant)} />
              {contents}
            </span> : ''
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
      />
    </Snackbar>
  )
}

export default CommonAlert
