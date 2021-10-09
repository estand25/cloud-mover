import React from 'react'
import { render } from '@testing-library/react'
import { LogInUser } from '../../../src/components/account'

describe('Testing with Positive param', () => {
    const classes = {
        root: {
            '& .MuiTextField-root': {
              margin: '1px',
              width: '25ch',
            },
            '& .MuiButton-root': {
                margin: '1px',
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
          }
    }
    const logIn = () => {}
    const updateState = (value, targetField) => {}
    const updateShowPassword = () => {}
    const handleMouseDownPassword = () => {}

    it('render without crashing without any logIn Info', () => {
        const logInObj = {
            email: '',
            password: '',
            showPassword: false
        }

        const logIn_ = render(
            <LogInUser
                classes={classes}
                value={logInObj}
                onChange={updateState}
                onChangeShowPassword={updateShowPassword}
                onChangeMouseShowPassword={handleMouseDownPassword}
                onLogIn={logIn}
            />
        )

        expect(logIn_).toBeTruthy();
    })
    it('render without crashing with logIn Info', () => {
        const logInObj = {
            email: 'email',
            password: '1234568',
            showPassword: false
        }

        const logIn_ = render(
            <LogInUser
                classes={classes}
                value={logInObj}
                onChange={updateState}
                onChangeShowPassword={updateShowPassword}
                onChangeMouseShowPassword={handleMouseDownPassword}
                onLogIn={logIn}
            />
        )

        expect(logIn_).toBeTruthy();
    })
})