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
                    data-testid="outlined-email"
                    required
                    label={"Email"}
                    name={"email"}
                    value={value.email}
                    variant="outlined"
                    onChange={onChange}
                    error={!value.email}
                    helperText={!value.email ? 'Email is required' : ''}
                />
            </div>
            <div>
                <PasswordTextField
                    classes={classes}
                    label={'Password'}
                    value={value.password}
                    showPassword={value.showPassword}
                    onChange={onChange}
                    onChangeShowPassword={onChangeShowPassword}
                    onChangeMouseShowPassword={onChangeMouseShowPassword}
                />
            </div>
            <Button
                id="logInBtn"
                onClick={onLogIn}
                variant="outlined"
            >
                Log-In
            </Button>
        </form>
    )
}

export default LogInUser;