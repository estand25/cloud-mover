import React from 'react'
import { render } from '@testing-library/react'
import { PasswordTextField } from '../../../src/components/account'

describe('Testing with Positive param', () => {
    const onChange = (value, targetField) => {}
    const onChangeMouseShowPassword = () => {}
    const onChangeShowPassword = () => {}
    const classess = {
        margin: {
            margin: '1px',
          },
        textField: {
            width: '25ch',
        }
    }

    it('render without crashing with password not showing', () => {
        const passwordField = render(
            <PasswordTextField
                classes={classess}
                label={'Password'}
                value={'password'}
                showPassword={false}
                onChange={(e) => onChange(e.target.value, 'password')}
                onChangeShowPassword={onChangeShowPassword}
                onChangeMouseShowPassword={onChangeMouseShowPassword}
            />
        )

        expect(passwordField).toBeTruthy();
    })

    it('render without crashing with password showing', () => {
        const passwordField = render(
            <PasswordTextField
                classes={classess}
                label={'Password'}
                value={'password'}
                showPassword={true}
                onChange={(e) => onChange(e.target.value, 'password')}
                onChangeShowPassword={onChangeShowPassword}
                onChangeMouseShowPassword={onChangeMouseShowPassword}
            />
        )

        expect(passwordField).toBeTruthy();
    })
})