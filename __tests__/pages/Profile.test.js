import React from 'react'
import { render } from '@testing-library/react'
import { Profile } from '../../src/pages'
import * as reactFire from 'reactfire'

jest.mock("reactfire", () => {
    return {
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
        const profile = render(
            <Profile />
        )

        expect(profile).toBeTruthy();
    })
})

