import React from 'react'
import { render } from '@testing-library/react'
import { LogOut } from '../../src/pages'
import * as reactFire from 'reactfire'

jest.mock("reactfire", () => ({
    useAuth: jest.fn()
}))


describe('Testing with positive param', () => {
    beforeEach(() => {
        useAuthMock.mockImplementation(() => () => { });
    })

    afterEach(() => {
        useAuthMock.mockClear();
    })

    const useAuthMock = reactFire.useAuth;
    
    it('Render without crashing', () => {
        const logOut = render(
            <LogOut />
        )

        expect(logOut).toBeTruthy();
    })
})

