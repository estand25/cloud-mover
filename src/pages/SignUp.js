import React, { useState } from 'react'

import { useAuth, useFirestore } from "reactfire";
import { useHistory } from 'react-router';

import { SignUpUser } from '../components/account';
import { CardLayout, SnackBarHolder } from "../components/general";
import { 
    updateState, 
    updateAlert, 
    updateShowPassword, 
    handleMouseDownPassword, 
    routeHome,
    createUser
} from '../utilies';

import {
    useStyles
} from '../styles';

import {
    defaultSignUp,
    defaultAlert
} from '../constant'

const SignUp = () => {
    const classes = useStyles();
    const auth = useAuth()
    const firestore = useFirestore()
    const history = useHistory()

    const [reg, setReg] = useState(defaultSignUp)
    const [alert, setAlert] = useState(defaultAlert)

    return (
        <CardLayout
            header={'Sign Up'}
        >
            <SnackBarHolder
                classes={classes}
                alert={alert}
                onHandleClose={() => {
                    updateAlert(null, null, !alert.open, alert, setAlert)
                    routeHome(alert, history)
                }}
            />
            <SignUpUser
                classes={classes}
                onChangeState={(e) => updateState(e, setReg, reg)}
                value={reg}
                onChangeShowPassword={() => 
                    updateShowPassword(setReg, reg, !reg.showPassword)
                }
                onChangeMouseShowPassword={handleMouseDownPassword}
                onSubmit={() => {
                    createUser(auth, firestore, reg, alert, setAlert)
                }}
            />
        </CardLayout>
    )
}

export default SignUp
