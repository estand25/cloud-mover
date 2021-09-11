import React from 'react'
import { render } from '@testing-library/react'
import { AccountIcon } from '../../../src/components/account'
import * as reactFire from 'reactfire'

jest.mock("reactfire", () => ({
    useSigninCheck: jest.fn()
}))

describe('Testing AccountIcon without Sign In', () => {
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

describe('Testing AccountIcon with Sign In and signIn present with user null', () => {
    beforeEach(() => {
        useSigninCheckMock.mockImplementation(() => () => { 
            data: {
                signedIn: true
                user: {}
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

describe('Testing AccountIcon with Sign In and signIn present with user displayName present only', () => {
    beforeEach(() => {
        useSigninCheckMock.mockImplementation(() => () => { 
            data: {
                signedIn: true
                user: {
                    displayName: 'displayName'
                }
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

describe('Testing AccountIcon with Sign In and signIn present with user photoURL present only', () => {
    beforeEach(() => {
        useSigninCheckMock.mockImplementation(() => () => { 
            data: {
                signedIn: true
                user: {
                    photoURL: "https://jooinn.com/images/colorful-paint-2.jpg"
                }
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

describe('Testing AccountIcon with Sign In and signIn present with user displayName & photoURL are present', () => {
    beforeEach(() => {
        useSigninCheckMock.mockImplementation(() => () => { 
            data: {
                signedIn: true
                user: {
                    displayName:'Test1'
                    photoURL: "https://jooinn.com/images/colorful-paint-2.jpg"
                }
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