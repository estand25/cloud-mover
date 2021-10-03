import React from 'react'
import { render } from '@testing-library/react'
import { NavBarAvatar } from '../../../src/components/navigation'
import * as reactFire from 'reactfire'    

jest.mock("reactfire", () => {
    return {
        useSigninCheck:  jest.fn(),
    }
})


describe('Testing with  without use data', () => {          
    beforeEach(() => {
        useSigninCheckMock.mockImplementation(() => () => {
            data: null
         });
    })

    afterEach(() => {
        useSigninCheckMock.mockClear();
    }) 

    
    const useSigninCheckMock = reactFire.useSigninCheck;

    it('render without crashing', () => {
    
        const navBarAvatar = render(
            <NavBarAvatar />
        )

        expect(navBarAvatar).toBeTruthy();
    })
})

describe('Testing with  with use data', () => {          
    beforeEach(() => {
        useSigninCheckMock.mockImplementation(() => () => {
            data: {
                uid: 'fakeID'
            }
         });
    })

    afterEach(() => {
        useSigninCheckMock.mockClear();
    }) 

    const useSigninCheckMock = reactFire.useSigninCheck;

    it('render without crashing', () => {
    
        const navBarAvatar = render(
            <NavBarAvatar />
        )

        expect(navBarAvatar).toBeTruthy();
    })
})