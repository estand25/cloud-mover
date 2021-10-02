import React, {useState} from 'react'

import { useAuth } from "reactfire";
import { useHistory } from 'react-router-dom'

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

import {
    defaultLogIn, 
    defaultAlert
} from '../constant'

const LogIn = () => {
    const classes = useStyles();
    const auth = useAuth()
    const history = useHistory()
    
    const [logInObj, setLogIn] = useState(defaultLogIn)
    const [alert, setAlert] = useState(defaultAlert)

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