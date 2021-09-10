import React from 'react'
import { render } from '@testing-library/react'
import { NavBar } from '../../../src/components/navigation'
import * as reactFire from 'reactfire'

jest.mock("reactfire", () => ({
    useSigninCheck: jest.fn()
}))

describe('Testing with positive param', () => {
    beforeEach(() => {
        useSigninCheckMock.mockImplementation(() => () => { });
    })

    afterEach(() => {
        useSigninCheckMock.mockClear();
    })

    const useSigninCheckMock = reactFire.useSigninCheck;
    
    it('render without crashing', () => {
        const navBar = render(
            <NavBar/>
        )

        expect(navBar).toBeTruthy();
    })
})