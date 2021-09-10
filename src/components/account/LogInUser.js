import React from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {PasswordTextField} from '.'

const LogInUser = ({classes, value, onChange, onChangeShowPassword, onChangeMouseShowPassword, onLogIn}) => {
    return (
        <form className={classes.root}>
            <div>
                <TextField
                    id="outlined-email"
                    label="Email"
                    value={value.email}
                    variant="outlined"
                    onChange={(e) => onChange(e.target.value, 'email')}
                />
            </div>
            <div>
                <PasswordTextField
                    classes={classes}
                    label={'Password'}
                    value={value.password}
                    showPassword={value.showPassword}
                    onChange={(e) => onChange(e.target.value, 'password')}
                    onChangeShowPassword={onChangeShowPassword}
                    onChangeMouseShowPassword={onChangeMouseShowPassword}
                />
            </div>
            <Button
                onClick={onLogIn}
                variant="outlined"
            >
                Log-In
            </Button>
        </form>
    )
}

export default LogInUser;