import React, { useState } from 'react'

import { 
    AccountInfo 
} from '../components/account';

import { 
    CardLayout, 
    SnackBarHolder 
} from '../components/general';

import { 
    useHistory 
} from 'react-router';

import { 
    updateState, 
    updateAlert, 
    routeHome,
    accountUpdated,
    accountDelete
} from '../utilies'

import {
    useStyles
} from '../styles'

import {
    defaultAlert
} from '../constant'

import useMyAccount from '../hooks/useMyAccount';

const MyAccount = () => {
    const classes = useStyles();
    const history = useHistory();

    const [alert, setAlert] = useState(defaultAlert)

    const {
        isLoading, 
        account, 
        setAccount, 
        firestore,
        storage, 
        auth
    } = useMyAccount()

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
                isLoading={isLoading}
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