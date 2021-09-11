import React, { useState, useEffect} from 'react'
import { deleteDoc, doc, getDoc, updateDoc} from '@firebase/firestore'
import { useStorage, useFirestore, useSigninCheck, useAuth } from 'reactfire'
import { makeStyles } from '@material-ui/core/styles';

import { AccountInfo } from '../components/account';
import { CardLayout } from '../components/general';
import { deleteObject, ref } from '@firebase/storage';

import { useHistory } from 'react-router';

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


    const updateState = (e) => {
        var updateValues = Object.assign(account, {});
        updateValues[e.target.name] = e.target.value;

        setAccount({
            ...account,
            ...updateValues
        })
    }

    const onAccountUpdated = () => {
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
        var imageExt = account?.imageExt ?? 'undefined';
        if(imageExt != ''){
            var storageInfo  =`images/${account.uid}/profile_image.${account.imageExt}`;
            const imageRef = ref(storage, storageInfo)
            deleteObject(imageRef)
        }

        const accountRef = doc(firestore, 'users', account.uid)
        var delDoc = deleteDoc(accountRef);

        auth.currentUser.delete()
        .then(result => {
            console.log('Profile successfully delete')
        })
        .catch(error => {
            console.error('Error on delete Profile', error)
        })

        history.push('/')
    }

    return (
        <CardLayout
            header={'My Account'}
        >
            <AccountInfo
                classes={classes}
                value={account}
                onChangeState={updateState}
                onChangeAccount={onAccountUpdated}
                onDeleteAccount={onAccountDelete}
            />
        </CardLayout>
    )
}

export default MyAccount;