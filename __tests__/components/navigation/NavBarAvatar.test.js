import React from 'react'
import { render } from '@testing-library/react'
import { NavBarAvatar } from '../../../src/components/navigation'
import * as reactFire from 'reactfire'

jest.mock("reactfire", () => {
    return {
        useSigninCheck:  jest.fn().mockResolvedValue({
            data: {
                uid: "fakeUid",
             },
           }),
    }
})

describe('Testing with positive param', () => {    
    it('render without crashing', () => {
        const navBarAvatar = render(
            <NavBarAvatar />
        )

        expect(navBarAvatar).toBeTruthy();
    })
})