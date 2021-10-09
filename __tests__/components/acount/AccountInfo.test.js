import React from 'react'
import { render } from '@testing-library/react'
import { AccountInfo } from '../../../src/components/account'

it('render without crashing', () => {
    const classes = {
        root: {
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
    }

    const account = {
        authProvider: 'initial',
        name: 'test1',
        imageExt: 'png',
        uid: 'test_test1'
    }

    const updateState = (e) => { }
    const onAccountUpdate = () => {}
    const onAccountDelete = () => {}

    const accountInfo = render(
        <AccountInfo
            classes={classes}
            value={account}
            onChangeState={updateState}
            onChangeAccount={onAccountUpdate}
            onDeleteAccount={onAccountDelete}
        />
    )

    expect(accountInfo).toBeTruthy();
})
