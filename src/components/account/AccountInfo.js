import React, { useState, useEffect} from 'react'
import { deleteDoc, doc, getDoc, updateDoc, } from '@firebase/firestore'
import { useStorage, useFirestore, useSigninCheck } from 'reactfire'
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { deleteUser } from '@firebase/auth';
import { deleteObject, ref } from '@firebase/storage';

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
  }));

const AccountInfo = () => {
    const classes = useStyles();
    const firestore = useFirestore();
    const storage = useStorage();

    const {state: signInState, data: signInCheckResult} = useSigninCheck()  
    const [account, setAccount] = useState({
        authProvider: '',
        name: '',
        imageExt: '',
        uid: ''
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


    const updateState = (value, targetField) => {
        var updateValues = Object.assign(account, {});
        updateValues[targetField] = value;

        setAccount({
            ...account,
            ...updateValues
        })
    }

    const onAccountInfo = () => {
        const accountRef = doc(firestore, 'users', account.uid)

        updateDoc(accountRef,{
            authProvider: account.authProvider,
            name: account.name
        })
        .then(resutl => {
            console.log('User successfully Updated')
        })
        .catch(error => {
            console.error('Error on updating user')
        })
    }

    const onAccountDelete = () => {
        console.log('onAccountDelete') 

        var { user } = signInCheckResult
        var storageInfo  = `images/${account.uid}.${account.imageExt}`;
        console.log('storage', storageInfo)
        const imageRef = ref(storage, storageInfo)
        console.log('imageRef', imageRef)
        const accountRef = doc(firestore, 'users', account.uid)
        
        deleteDoc(accountRef)
        .then(result => {
            console.log('User successfully delete')
            deleteUser(user)
            .then(result => {
                console.log('Profile successfully delete')
                deleteObject(imageRef)
                .then(result => {
                    console.log('Storage Image successfully delete')
                })
                .catch(error => {
                    console.error('Error on delete Storage Image', error)
                })
            })
            .catch(error => {
                console.error('Error on delete Profile', error)
            })
        })
        .catch(error => {
            console.error('Error on delete User', error)
        })
    }

    return (
        <form className={classes.root}>
            <div>
                <TextField
                    id="outline"
                    label="Name"
                    value={account.name}
                    variant="outlined"
                    onChange={(e) => updateState(e.target.value,'name')}
                />
            </div>
            <div>
                <TextField
                    id="outline"
                    label="Auth Provider"
                    value={account.authProvider}
                    variant="outlined"
                    onChange={(e) => updateState(e.target.value,'authProvider')}
                />
            </div>
            <div>
                <TextField
                    inputProps={{
                        readOnly: true,
                        disabled: true,
                    }}
                    id="outline"
                    label="Unique Id"
                    value={account.uid}
                    variant="outlined"
                />
            </div>
            <div>
                <Button 
                    variant="outlined" 
                    onClick={onAccountInfo}
                >
                    Update Account
                </Button>
            </div>
            <div>
                <Button 
                    variant="outlined" 
                    color="secondary"
                    onClick={onAccountDelete}
                >
                    Delete Account
                </Button>
            </div>
        </form>
    )

}

export default AccountInfo