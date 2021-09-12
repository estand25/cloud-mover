import React, {useState} from 'react'

import { useAuth, useFirestore } from "reactfire";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import { LogInUser } from '../components/account';
import { CardLayout, SnackBarHolder } from '../components/general';
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
    card: {
        maxWidth: 345,  
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      },
    header: {
        textAlign: 'center'
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

    const [alert, setAlert] = useState({
        severity: '',
        text: '',
        open: false
    })

    const logIn = () => {
        try {
            if(logInObj.email && logInObj.password)
            {
                signInWithEmailAndPassword(auth, logInObj.email, logInObj.password)
                .then(data => {
                    const userRef = doc(firestore, 'users', data.user.uid)

                    getDoc(userRef)
                        .then(result => {
                            console.log('getDoc', result.data())

                            updateAlert(
                                'success',
                                'Log-In account successfully',
                                true,
                                alert,
                                setAlert
                            )
                        })
                        .catch(error =>  {
                            console.log('get err', error)
                            updateAlert(
                                'error',
                                `Account information could not be retrieved for the following reason: ${error}!`,
                                true,
                                alert,
                                setAlert
                            )
                        })

                    // history.push('/')
                })
                .catch(error => {
                    console.error(error, 'error')
                    updateAlert(
                        'error',
                        `Log-In was not sucessfully for the following reason: ${error} !`,
                        true,
                        alert,
                        setAlert
                    )
                });
            }
            else
            {
                console.log('Email & password must be provider')

                updateAlert(
                    'error',
                    'Email & password must be provider !',
                    true,
                    alert,
                    setAlert
                )           
            }
        } catch (error) {
            console.error(error, 'err')

            updateAlert(
                'error',
                'Something went wrong while trying to log-in. Try again later!',
                true,
                alert,
                setAlert
            )
        }
    }

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
                onLogIn={logIn}
            /> 
        </CardLayout>
    )
}

export default LogIn