import React from 'react'
import { render } from '@testing-library/react'
import { SignUpUser } from '../../../src/components/account'

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
    const signUpObj = {
        email: '',
        password: '',
        name: '',
        showPassword: false
    }
    const onSubmit = () => {}
    const updateState = (value, targetField) => {}
    const updateShowPassword = () => {}
    const handleMouseDownPassword = () => {}

    it('render without crashing', () => {
        const signUpUser = render(
            <SignUpUser
                classes={classes}
                onChangeState={updateState}
                value={signUpObj}
                onChangeShowPassword={updateShowPassword}
                onChangeMouseShowPassword={handleMouseDownPassword}
                onSubmit={onSubmit}
            />
        )

        expect(signUpUser).toBeTruthy();
    })
})