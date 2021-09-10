import React from 'react'
import { render } from '@testing-library/react'
import MuiMenu from '../../../src/components/navigation/MuiMenu'

describe('Testing with positive param', () => {
    it('renders without crashing', () => {
        const muiMenu = render(
            <MuiMenu 
                open={false}
            />
        )

        expect(muiMenu).toBeTruthy();
    })

})