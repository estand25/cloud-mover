import React from 'react'
import { render } from '@testing-library/react'
import { AccountIcon } from '../../../src/components/account'
import * as reactFire from 'reactfire'

jest.mock("reactfire", () => ({
    useSigninCheck: jest.fn()
}))

describe('Testing AccountIcon without data present', () => {
    beforeEach(() => {
        useSigninCheckMock.mockImplementation(() => () => { });
    })

    afterEach(() => {
        useSigninCheckMock.mockClear();
    })

    const useSigninCheckMock = reactFire.useSigninCheck;

    it('render without crashing', () => {
        const accountIcon = render(
            <AccountIcon />
        )

        expect(accountIcon).toBeTruthy();
    })
})

describe('Testing AccountIcon with Sign In and signIn true', () => {
    beforeEach(() => {
        useSigninCheckMock.mockImplementation(() => () => { 
            data: {
                signedIn: true
            }
        });
    })

    afterEach(() => {
        useSigninCheckMock.mockClear();
    })

    const useSigninCheckMock = reactFire.useSigninCheck;

    it('render without crashing', () => {
        const accountIcon = render(
            <AccountIcon />
        )

        expect(accountIcon).toBeTruthy();
    })
})

describe('Testing AccountIcon with Sign In and signIn true', () => {
    beforeEach(() => {
        useSigninCheckMock.mockImplementation(() => () => { 
            data: {
                signedIn: false
            }
        });
    })

    afterEach(() => {
        useSigninCheckMock.mockClear();
    })

    const useSigninCheckMock = reactFire.useSigninCheck;

    it('render without crashing', () => {
        const accountIcon = render(
            <AccountIcon />
        )

        expect(accountIcon).toBeTruthy();
    })
})

describe('Testing AccountIcon with Sign In and signIn null', () => {
    beforeEach(() => {
        useSigninCheckMock.mockImplementation(() => () => { 
            data: {
                signedIn: null
            }
        });
    })

    afterEach(() => {
        useSigninCheckMock.mockClear();
    })

    const useSigninCheckMock = reactFire.useSigninCheck;

    it('render without crashing', () => {
        const accountIcon = render(
            <AccountIcon />
        )

        expect(accountIcon).toBeTruthy();
    })
})

describe('Testing AccountIcon with data present, but null', () => {
    beforeEach(() => {
        useSigninCheckMock.mockImplementation(() => () => { 
            data: {}
        });
    })

    afterEach(() => {
        useSigninCheckMock.mockClear();
    })

    const useSigninCheckMock = reactFire.useSigninCheck;

    it('render without crashing', () => {
        const accountIcon = render(
            <AccountIcon />
        )

        expect(accountIcon).toBeTruthy();
    })
})