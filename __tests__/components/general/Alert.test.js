import React from 'react'
import {render} from '@testing-library/react'
import { Alert } from '../../../src/components/general'

describe('Testing Alert works with positive params', () => {
    const onOpen = () => true
    const onClose = () => false
    const severity = 'success'
    const test = 'test'

    it('render without crashing when close', () => {
        const alert = render(
            <Alert onClose={onClose} severity={severity}>
                {test}
            </Alert>
        )
        expect(alert).toBeTruthy();
    })

    it('render without crashing when close', () => {
        const alert = render(
            <Alert onClose={onOpen} severity={severity}>
                {test}
            </Alert>
        )
        
        expect(alert).toBeTruthy();
    })
})