import React, { useState } from 'react'

import { useAuth, useFirestore } from "reactfire";
import { doc, setDoc} from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

import { SignUpUser } from '../components/account';
import { CardLayout } from "../components/general";

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
        <CardLayout
            header={'Sign Up'}
        >
            <SignUpUser
                classes={classes}
                onChangeState={updateState}
                value={reg}
                onChangeShowPassword={updateShowPassword}
                onChangeMouseShowPassword={handleMouseDownPassword}
                onSubmit={createUser}
            />
        </CardLayout>
    )
  }

  export default SignUp
