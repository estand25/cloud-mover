import React from 'react'
import { render } from '@testing-library/react'
import { LogOutUser } from '../../../src/components/account'

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
          }       
    }

    const onLogOut = () => {}

    it('render without crashing', () => {
        const logOutUser = render(
            <LogOutUser
                classes={classes}
                onLogOut={onLogOut}
            />
        )

        expect(logOutUser).toBeTruthy();
    })
})