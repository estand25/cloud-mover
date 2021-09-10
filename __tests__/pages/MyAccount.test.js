import React from 'react'
import { render } from '@testing-library/react'
import { MyAccount } from '../../src/pages'
import * as reactFire from 'reactfire'

jest.mock("reactfire", () => ({
    useAuth: jest.fn(),
    useFirestore: jest.fn(),
    useStorage: jest.fn(),
    useSigninCheck: jest.fn()
}))

describe('Testing with positive param', () => {
    beforeEach(() => {
        useAuthMock.mockImplementation(() => () => { });
        useFirestoreMock.mockImplementation(() => () => { });
        useStorageMock.mockImplementation(() => () => { });
        useSigninCheckMock.mockImplementation(() => () => { });
    })

    afterEach(() => {
        useAuthMock.mockClear();
        useFirestoreMock.mockClear();
        useStorageMock.mockClear();
        useSigninCheckMock.mockClear();
    })

    const useAuthMock = reactFire.useAuth;
    const useFirestoreMock = reactFire.useFirestore;
    const useStorageMock = reactFire.useStorage;
    const useSigninCheckMock = reactFire.useSigninCheck;
    
    it('Render without crashing', () => {
        const myAccount = render(
            <MyAccount />
        )

        expect(myAccount).toBeTruthy();
    })
})

