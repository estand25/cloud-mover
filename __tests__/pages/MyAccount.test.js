import React from 'react'
import { render } from '@testing-library/react'
import { MyAccount } from '../../src/pages'
import * as reactFire from 'reactfire'

jest.mock("reactfire", () => {
    return {
        useAuth: jest.fn(),
        useFirestore: jest.fn(),
        useStorage: jest.fn(),
        useSigninCheck: jest.fn(),
        useUser: jest.fn().mockResolvedValue({
            user: {
                data: "fakeUid",
             },
           }),
    }
})

describe('Testing with positive param', () => {    
    it('Render without crashing', () => {
        const myAccount = render(
            <MyAccount />
        )

        expect(myAccount).toBeTruthy();
    })
})

