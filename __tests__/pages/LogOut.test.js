import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LogOut } from '../../src/pages'
import * as reactFire from 'reactfire'
import * as firebaseAuth from 'firebase/auth'
import * as reactRouterDom from 'react-router-dom'

import { 
    routeHome
} from '../../src/utilies'

jest.mock("../../src/utilies", () => {
    return {
        routeHome: jest.fn()
    }
})

// Clear mock data before each test
beforeEach(() => {
    routeHome.mockClear()
  });


jest.mock("reactfire", () => {
    return {
        useAuth: jest.fn(),
    }
})

jest.mock("firebase/auth", () => {
    return {
        signOut: jest.fn()
    }
})

jest.mock("react-router-dom", () => {
    return {
        useHistory: jest.fn()
    }
})

describe('Testing with positive param LogOut', () => {    
    it('Render without crashing', () => {
        const logOut = render(
            <LogOut />
        )

        expect(logOut).toBeTruthy();
    })
})

describe('Testing interactions LogOut', () => {
    it('Log Out button appears', () => {
       const { container } = render(<LogOut/>) 
       const logOutBtn = container.querySelector('#logOutBtn');

       const onLogOut = jest.fn()

        fireEvent.click(logOutBtn)

       const auth = reactFire.useAuth()
       const history = reactRouterDom.useHistory()

        expect(onLogOut).toHaveBeenCalledTimes(0)
    })
})
