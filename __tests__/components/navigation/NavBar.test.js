import React from 'react'
import { render } from '@testing-library/react'
import { NavBar } from '../../../src/components/navigation'
import * as reactFire from 'reactfire'

jest.mock("reactfire", () => {
    return {
        useSigninCheck:  jest.fn().mockResolvedValue({
            data: {
                uid: "fakeUid",
             },
           }),
           
        useUser:  jest.fn().mockResolvedValue({
            user: {
                data: "fakeUid",
             },
           }),
    }
})

describe('Testing with positive param', () => {    
    it('render without crashing', () => {
        const navBar = render(
            <NavBar/>
        )

        expect(navBar).toBeTruthy();
    })
})