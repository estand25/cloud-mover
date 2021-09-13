import React, { useState, useEffect} from 'react'
import { doc, getDoc} from '@firebase/firestore'
import { useStorage, useFirestore, useSigninCheck, useAuth } from 'reactfire'
import { makeStyles } from '@material-ui/core/styles';

import { AccountInfo } from '../components/account';
import { CardLayout, SnackBarHolder } from '../components/general';

import { useHistory } from 'react-router';

import { 
    updateState, 
    updateAlert, 
    routeHome,
    accountUpdated,
    accountDeletem,
} from '../utilies'

import {
    useStyles
} from '../styles'

const MyAccount = () => {
    const classes = useStyles();
    const firestore = useFirestore();
    const storage = useStorage();
    const auth = useAuth();
    const history = useHistory();

    const { data: signInCheckResult } = useSigninCheck()  
    const [account, setAccount] = useState({
        authProvider: '',
        name: '',
        imageExt: '',
        uid: ''
    })
    
    const [alert, setAlert] = useState({
        severity: '',
        text: '',
        open: false
    })

    useEffect(() => {
        if(typeof(signInCheckResult?.user) !== 'undefined'){           
            var { user } = signInCheckResult

            if(user && user?.uid !== 'undefined'){
                const userRef = doc(firestore, 'users', user?.uid)

                getDoc(userRef)
                    .then(result => {var updAccount = {};
                        updAccount.authProvider = result?.data()?.authProvider ?? '';
                        updAccount.name = result?.data()?.name ?? '';
                        updAccount.uid = result?.data()?.uid ?? '';
                        updAccount.imageExt = result?.data()?.imageExt ?? '';

                        setAccount({...account,...updAccount})
                        console.log('UseEffect Account', result?.data())
                    })
                    .catch(error => {
                        console.log('UseEffect Account Error', error)
                    })
            }
        }
    }, [signInCheckResult])

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