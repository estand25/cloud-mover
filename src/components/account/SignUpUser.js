import React, { useState} from 'react'

import { useAuth, useFirestore } from "reactfire";
import { doc, setDoc} from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

import {PasswordTextField} from '.'

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

const SignUpUser = () => {
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

    const createUser = () => {
        try {
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

                history.push('/')
            })
            .catch(error => {
                console.error(error, 'error')
            })
        }
        catch(err){
            console.error(err, 'err')
        }
    }

    const updateState = (value, targetField) => {
        var updateValues = Object.assign(reg, {});
        updateValues[targetField] = value;

        setReg({
            ...reg,
            ...updateValues
        })
    }

    const updateShowPassword = () => setReg({...reg, showPassword: !reg.showPassword})
    const handleMouseDownPassword = (event) => event.preventDefault()

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <div>
                    <TextField
                        id="outlined-name"
                        label="Name"
                        value={reg.name}
                        variant={"outlined"}
                        onChange={(e) => updateState(e.target.value, 'name')}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-email"
                        label="Email"
                        value={reg.email}
                        variant={"outlined"}
                        onChange={(e) => updateState(e.target.value, 'email')}
                    />
                </div>
                <div>
                    <PasswordTextField
                        label={'Password'}
                        value={reg.password}
                        showPassword={reg.showPassword}
                        onChange={(e) => updateState(e.target.value, 'password')}
                        onChangeShowPassword={updateShowPassword}
                        onChangeMouseShowPassword={handleMouseDownPassword}
                    />
                </div>
                <Button variant="outlined" onClick={createUser}>
                    Register
                </Button>
            </div>
        </form>
    )
}

export default SignUpUser;