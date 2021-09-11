import React from 'react'
import { render } from '@testing-library/react'
import { LogIn } from '../../src/pages'
import * as reactFire from 'reactfire'

jest.mock("reactfire", () => ({
    useAuth: jest.fn(),
    useFirestore: jest.fn()
}))

describe('Testing with positive param', () => {
    beforeEach(() => {
        useAuthMock.mockImplementation(() => () => { });
        useFirestoreMock.mockImplementation(() => () => { });
    })

    afterEach(() => {
        useAuthMock.mockClear();
        useFirestoreMock.mockClear();
    })

    const useAuthMock = reactFire.useAuth;
    const useFirestoreMock = reactFire.useFirestore;
    
    it('Render without crashing', () => {
        const logIn = render(
            <LogIn />
        )

        expect(logIn).toBeTruthy();
    })
})

