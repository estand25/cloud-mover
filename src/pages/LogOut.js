import React from "react";
import { LogOutUser } from "../components/account";

import { useAuth } from "reactfire";
import { signOut } from 'firebase/auth'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'

import { CardLayout } from "../components/general";

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      '& .MuiButton-root': {
        margin: theme.spacing(1),
        width: '25ch',
      }
    }
  }));

const LogOut = () => {
    const classes = useStyles();
    const auth = useAuth()
    const history = useHistory()

    const onLogOut = () => {
        signOut(auth)
        history.push('/')
    }

    return (
        <CardLayout
            header={'Log Out'}
        >
            <LogOutUser
                classes={classes}
                onLogOut={onLogOut}
            />
        </CardLayout>
    )
}

export default LogOut