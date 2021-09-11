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
                        name="name"
                        value={value.name}
                        variant={"outlined"}
                        onChange={onChangeState}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-email"
                        label="Email"
                        name="email"
                        value={value.email}
                        variant={"outlined"}
                        onChange={onChangeState}
                    />
                </div>
                <div>
                    <PasswordTextField
                        classes={classes}
                        label={'Password'}
                        value={value.password}
                        showPassword={value.showPassword}
                        onChange={onChangeState}
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