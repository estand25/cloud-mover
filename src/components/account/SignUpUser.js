import React from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {PasswordTextField} from '.'

const SignUpUser = ({classes, onChangeState, value, onChangeShowPassword, onChangeMouseShowPassword, onSubmit}) => {
    return (
        <form className={classes.root} noValidate>
            <div>
                <div>
                    <TextField
                        id="outlined-name"
                        label="Name"
                        value={value.name}
                        variant={"outlined"}
                        onChange={(e) => onChangeState(e.target.value, 'name')}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-email"
                        label="Email"
                        value={value.email}
                        variant={"outlined"}
                        onChange={(e) => onChangeState(e.target.value, 'email')}
                    />
                </div>
                <div>
                    <PasswordTextField
                        label={'Password'}
                        value={value.password}
                        showPassword={value.showPassword}
                        onChange={(e) => onChangeState(e.target.value, 'password')}
                        onChangeShowPassword={onChangeShowPassword}
                        onChangeMouseShowPassword={onChangeMouseShowPassword}
                    />
                </div>
                <Button variant="outlined" onClick={onSubmit}>
                    Register
                </Button>
            </div>
        </form>
    )
}

export default SignUpUser;