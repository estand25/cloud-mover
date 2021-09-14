import React from 'react'
import { render } from '@testing-library/react'
import { SignUp } from '../../src/pages'
import * as reactFire from 'reactfire'

jest.mock("reactfire", () => {
    return {
        useAuth: jest.fn(),
        useFirestore: jest.fn()
    }
})

describe('Testing with positive param', () => {    
    it('Render without crashing', () => {
        const signUp = render(
            <SignUp />
        )

        expect(signUp).toBeTruthy();
    })
})

