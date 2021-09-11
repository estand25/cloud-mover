import React, { useState, useEffect} from 'react'
import { deleteDoc, doc, getDoc, updateDoc} from '@firebase/firestore'
import { useStorage, useFirestore, useSigninCheck, useAuth } from 'reactfire'
import { makeStyles } from '@material-ui/core/styles';


import { AccountInfo } from '../components/account';
import { CardLayout, SnackBarHolder } from '../components/general';
import { deleteObject, ref } from '@firebase/storage';

import { useHistory } from 'react-router';

import { updateState, updateAlert, routeHome } from '../utilies';

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
    },
    snackbar: {
        width: '100%',
        '& > * + *': {
        marginTop: theme.spacing(2),
        },
    },
  }));

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

    const onAccountUpdated = () => {
        try {
            if(account.authProvider && account.name){
                const accountRef = doc(firestore, 'users', account.uid)

                updateDoc(accountRef,{
                    authProvider: account.authProvider,
                    name: account.name
                })
                .then(resutl => {
                    console.log('User successfully Updated')

                    updateAlert(
                        'success',
                        'Account successfully Updated',
                        true,
                        alert,
                        setAlert
                    )
                })
                .catch(error => {
                    console.error('Error on updating user')

                    updateAlert(
                        'error',
                        'Account could not be updated. Please try again later',
                        true,
                        alert,
                        setAlert
                    )
                })
            }
            else
            {
                console.log('AuthProvider & name must be provider')

                updateAlert(
                    'error',
                    'AuthProvider & name must be provider !',
                    true,
                    alert,
                    setAlert
                )
            }
        } catch (error) {
            console.error(error, 'err')

            updateAlert(
                'error',
                'Something went wrong while trying to update the account. Try again later!',
                true,
                alert,
                setAlert
            )
        }
    }

    const onAccountDelete = () => {
        var imageExt = account?.imageExt;
        if(imageExt != ''){
            var storageInfo  =`images/${account.uid}/profile_image.${account.imageExt}`;
            const imageRef = ref(storage, storageInfo)
            deleteObject(imageRef)
        }

        if(account.uid)
        {   
            const accountRef = doc(firestore, 'users', account.uid)
            var delDoc = deleteDoc(accountRef);
        }

        auth.currentUser.delete()
        .then(result => {
            console.log('Profile successfully delete')
            
            updateAlert(
                'success',
                'Profile successfully delete',
                true,
                alert,
                setAlert
            )
        })
        .catch(error => {
            console.error('Error on delete Profile', error)

            updateAlert(
                'error',
                'Profile was not successfully delete',
                true,
                alert,
                setAlert
            )
        })

        history.push('/')
    }

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
                onChangeAccount={onAccountUpdated}
                onDeleteAccount={onAccountDelete}
            />
        </CardLayout>
    )
}

export default MyAccount;