import React, { useState } from 'react'

import { useAuth, useFirestore } from "reactfire";
import { doc, setDoc} from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

import { SignUpUser } from '../components/account';
import { CardLayout, SnackBarHolder } from "../components/general";
import { updateState, updateAlert, updateShowPassword, handleMouseDownPassword, routeHome } from '../utilies';


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
    margin: {
        margin: theme.spacing(1),
      },
    textField: {
        width: '25ch',
    },
    snackbar: {
        width: '100%',
        '& > * + *': {
        marginTop: theme.spacing(2),
        },
    },
  }));

  const SignUp = () => {
    const classes = useStyles();
    const auth = useAuth()
    const firestore = useFirestore()
    const history = useHistory()

    const [reg, setReg] = useState({
        email: '',
        password: '',
        name: '',
        showPassword: false
    })
    
    const [alert, setAlert] = useState({
        severity: '',
        text: '',
        open: false
    })

    const createUser = () => {
        try {
            if(reg.name && reg.email && reg.password){
                createUserWithEmailAndPassword(auth, reg.email, reg.password)
                .then(res => {
                    const user = res.user;
                    const userDoc = doc(firestore, 'users', user.uid);
        
                    setDoc(userDoc,{
                        uid: user.uid,
                        name: reg.name,
                        authProvider: "local",
                        email: reg.email,
                        password: reg.password
                    })

                    updateAlert(
                        'success',
                        'User has been successfully created',
                        true,
                        alert,
                        setAlert
                    )

                    // history.push('/')
                })
                .catch(error => {
                    console.error(error, 'error')

                    updateAlert(
                        'error',
                        'User could not be created. Please try again later',
                        true,
                        alert,
                        setAlert
                    )
                })
            }
            else
            {
                console.log('Name, email and password must be provider')

                updateAlert(
                    'error',
                    'Name, email and password must be provider !',
                    true,
                    alert,
                    setAlert
                )
            }
        }
        catch(err){
            console.error(err, 'err')

            updateAlert(
                'error',
                'User could not be created. Please try again later',
                true,
                alert,
                setAlert
            )
        }
    }

    // const updateShowPassword = () => setReg({...reg, showPassword: !reg.showPassword})
    // const handleMouseDownPassword = (event) => event.preventDefault()

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
                onSubmit={createUser}
            />
        </CardLayout>
    )
  }

  export default SignUp
