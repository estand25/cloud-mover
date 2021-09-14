import React, { useState, useEffect} from 'react'
import { useStorage, useFirestore, useAuth, useUser } from 'reactfire'

import { AccountInfo } from '../components/account';
import { CardLayout, SnackBarHolder } from '../components/general';

import { useHistory } from 'react-router';

import { 
    updateState, 
    updateAlert, 
    routeHome,
    accountUpdated,
    accountDelete,
    accountUseEffect
} from '../utilies'

import {
    useStyles
} from '../styles'

import {
    defaultMyAccount,
    defaultAlert
} from '../constant'

const MyAccount = () => {
    const classes = useStyles();
    const firestore = useFirestore();
    const storage = useStorage();
    const auth = useAuth();
    const history = useHistory();
    const user = useUser()
    
    const [account, setAccount] = useState(defaultMyAccount)
    const [alert, setAlert] = useState(defaultAlert)

    useEffect(() => {   
        accountUseEffect(firestore, user, account, setAccount)     
    }, [user.data])

    return (
        <CardLayout
            header={'My Account'}
        >
            <SnackBarHolder
                classes={classes}
                alert={alert}
                onHandleClose={() => {
                    updateAlert(null, null, !alert.open, alert, setAlert)
                    routeHome(alert, history)
                }}
            />
            <AccountInfo
                classes={classes}
                value={account}
                onChangeState={(e) => updateState(e, setAccount, account)}
                onChangeAccount={() => {
                    accountUpdated(firestore, account, alert, setAlert)
                }}
                onDeleteAccount={() => {
                    accountDelete(storage, firestore, auth, account, alert, setAlert)
                }}
            />
        </CardLayout>
    )
}

export default MyAccount;