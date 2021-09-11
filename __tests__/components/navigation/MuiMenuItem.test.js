import React from 'react'
import { render } from '@testing-library/react'
import MuiMenuItem from '../../../src/components/navigation/MuiMenuItem'

describe('Testing with positive param', () => {
    it('renders without crashing', () => {
        const muiMenuItem = render(
            <MuiMenuItem 
                value={1}
            >
                {'1'}
            </MuiMenuItem>
        )

        expect(muiMenuItem).toBeTruthy();
    })

})