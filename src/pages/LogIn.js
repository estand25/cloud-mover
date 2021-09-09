import React, {useState} from 'react'

import { useAuth, useFirestore } from "reactfire";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useHistory } from 'react-router-dom'

import { LogInUser } from '../components/account';

import { makeStyles } from '@material-ui/core/styles';

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
    }
  }));

const LogIn = () => {
    const classes = useStyles();
    const auth = useAuth()
    const firestore = useFirestore()
    const history = useHistory()
    
    const [logInObj, setLogIn] = useState({
        email: '',
        password: '',
        showPassword: false
    })

    const logIn = () => {
        try {
            signInWithEmailAndPassword(auth, logInObj.email, logInObj.password)
            .then(data => {
                const userRef = doc(firestore, 'users', data.user.uid)

                getDoc(userRef)
                    .then(result => {
                        console.log('getDoc', result.data())
                    })
                    .catch(error =>  {
                        console.log('get err', error)
                    })

                history.push('/')
            })
            .catch(error => {
                console.error(error, 'error')
            });
        } catch (error) {
            console.error(error, 'err')
        }
    }

    const updateState = (value, targetField) => {
        var updateValues = Object.assign(logInObj, {});
        updateValues[targetField] = value;

        setLogIn({
            ...logInObj,
            ...updateValues
        })
    }

    const updateShowPassword = () => setLogIn({...logInObj, showPassword: !logInObj.showPassword})
    const handleMouseDownPassword = (event) => event.preventDefault()

    return (
        <LogInUser
            classes={classes}
            value={logInObj}
            onChange={updateState}
            onChangeShowPassword={updateShowPassword}
            onChangeMouseShowPassword={handleMouseDownPassword}
            onLogIn={logIn}
        />
    )
}

export default LogIn