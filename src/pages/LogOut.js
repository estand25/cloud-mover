import React from "react";
import { LogOutUser } from "../components/account";

import { useAuth } from "reactfire";
import { signOut } from 'firebase/auth'
import { useHistory } from 'react-router-dom'

import { CardLayout } from "../components/general";
import { useStyles } from '../styles';

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