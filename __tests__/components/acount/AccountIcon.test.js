import React from 'react'
import { render } from '@testing-library/react'
import { AccountIcon } from '../../../src/components/account'
import * as reactFire from 'reactfire'

jest.mock("reactfire", () => {
    return {
        useUser:  jest.fn().mockResolvedValue({
            user: {
                data: "fakeUid",
             },
           }),
    }
})

describe('Testing AccountIcon without data present', () => {
    it('render without crashing', () => {
        const accountIcon = render(
            <AccountIcon />
        )

        expect(accountIcon).toBeTruthy();
    })
})

describe('Testing AccountIcon with Sign In and signIn true', () => {
    const user = {
        displayName: "fakeUid",
        photoURL: 'https://images.freeimages.com/images/large-previews/a35/wire-1230667.jpg'
     }

    it('render without crashing', () => {
        const accountIcon = render(
            <AccountIcon 
                IsSignIn={true}
                user={user}
            />
        )

        expect(accountIcon).toBeTruthy();
    })
})

describe('Testing AccountIcon with Sign In and signIn false', () => {
    it('render without crashing', () => {
        const accountIcon = render(
            <AccountIcon 
                IsSignIn={false}
            />
        )

        expect(accountIcon).toBeTruthy();
    })
})