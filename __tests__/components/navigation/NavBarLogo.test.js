import React from 'react'
import { render } from '@testing-library/react'
import { NavBarLogo } from '../../../src/components/navigation'

describe('Testing with positive param', () => {
    it('render without crashing', () => {
        const navBarLogo = render(
            <NavBarLogo/>
        )

        expect(navBarLogo).toBeTruthy();
    })
})