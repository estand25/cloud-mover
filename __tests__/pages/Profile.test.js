import React from 'react'
import { render } from '@testing-library/react'
import { Profile } from '../../src/pages'
import * as reactFire from 'reactfire'

jest.mock("reactfire", () => ({
    useFirestore: jest.fn(),
    useStorage: jest.fn(),
    useSigninCheck: jest.fn()
}))


describe('Testing with positive param', () => {
    beforeEach(() => {
        useFirestoreMock.mockImplementation(() => () => { });
        useStorageMock.mockImplementation(() => () => { });
        useSigninCheckMock.mockImplementation(() => () => { });
    })

    afterEach(() => {
        useFirestoreMock.mockClear();
        useStorageMock.mockClear();
        useSigninCheckMock.mockClear();
    })

    const useFirestoreMock = reactFire.useFirestore;
    const useStorageMock = reactFire.useStorage;
    const useSigninCheckMock = reactFire.useSigninCheck;
    
    it('Render without crashing', () => {
        const profile = render(
            <Profile />
        )

        expect(profile).toBeTruthy();
    })
})

