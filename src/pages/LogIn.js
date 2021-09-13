import React, {useState} from 'react'

import { useAuth } from "reactfire";
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import { LogInUser } from '../components/account';
import { CardLayout, SnackBarHolder } from '../components/general';
import { 
    updateState, 
    updateAlert, 
    updateShowPassword, 
    handleMouseDownPassword, 
    routeHome,
    logIn
} from '../utilies'

import {
    useStyles
} from '../styles'

const LogIn = () => {
    const classes = useStyles();
    const auth = useAuth()
    const history = useHistory()
    
    const [logInObj, setLogIn] = useState({
        email: '',
        password: '',
        showPassword: false
    })

    const [alert, setAlert] = useState({
        severity: '',
        text: '',
        open: false
    })

    return (
        <CardLayout
            header={'Log In'}
        >
            <SnackBarHolder
                classes={classes}
                alert={alert}
                onHandleClose={() => {
                    updateAlert(null, null, !alert.open, alert, setAlert)
                    routeHome(alert, history)
                }}
            />
            <LogInUser
                classes={classes}
                value={logInObj}
                onChange={(e) => updateState(e, setLogIn, logInObj)}
                onChangeShowPassword={() => 
                    updateShowPassword(setLogIn, logInObj, !logInObj.showPassword)
                }
                onChangeMouseShowPassword={handleMouseDownPassword}
                onLogIn={() => {
                    logIn(auth, logInObj, alert, setAlert)
                }}
            /> 
        </CardLayout>
    )
}

export default LogIn