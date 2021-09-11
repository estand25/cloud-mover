import React from 'react'
import { render } from '@testing-library/react'
import { SnackBarHolder } from '../../../src/components/general'

describe('Testing SnackBarHolder works with positive params', () => {
    const onOpen = () => true
    const onClose = () => false
    const alert = {
        open: false,
        severity: 'success',
        text: 'Test'
    }
    const classes = {}

    it('render without crashing when close', () => {
        const snackBarHolder = render(
            <SnackBarHolder
                classes={classes}
                alert={alert}
                onHandleClose={onClose}
            />
        )
        expect(snackBarHolder).toBeTruthy();
    })

    it('render without crashing when open', () => {
        const snackBarHolder = render(
            <SnackBarHolder
                classes={classes}
                alert={alert}
                onHandleClose={onClose}
            />
        )
        
        expect(snackBarHolder).toBeTruthy();
    })
})