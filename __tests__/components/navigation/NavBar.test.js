import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { NavBar } from '../../../src/components/navigation'
import * as reactFire from 'reactfire'
import * as reactRouterDom from 'react-router-dom'

jest.mock("reactfire", () => {
    return {
        useSigninCheck:  jest.fn().mockResolvedValue({
            data: {
                uid: "fakeUid",
             },
           }),
           
        useUser: jest.fn().mockResolvedValue({
            user: {
                data: "fakeUid",
             },
           }),
    }
})

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  }));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}))

describe('Testing with positive param', () => {    
    it('render without crashing', () => {
        const navBar = render(
            <NavBar/>
        )

        expect(navBar).toBeTruthy();
    })
})

describe('Testing NavBar interaction', () => {   
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(initialState => [initialState, setState]);

    it('NavBarLogo btn is present', () => {
        const { container } = render(
            <NavBar/>
        )

        const navIconBtn = container.querySelector("#nav-icon-btn");

        expect(navIconBtn).toBeTruthy()
    })

    it('NavBarLogo btn on click', () => {
        const history = reactRouterDom.useHistory()

        const { container } = render(
            <NavBar/>
        )

        const navIconBtn = container.querySelector("#nav-icon-btn");

        const onHome = jest.fn();

        fireEvent.click(navIconBtn)

        expect(mockHistoryPush).toHaveBeenCalledWith('/');
    })

    it('NavBarMobile btn is present', () => {
        const { container } = render(
            <NavBar/>
        )

        const navBarMobileBtn = container.querySelector("#nav-bar-mobile-btn");

        expect(navBarMobileBtn).toBeTruthy()
    })

    // it('NavBarMobile btn on click', () => {
    //     const newInputValue = null;
    //     const { container } = render(
    //         <NavBar/>
    //     )

    //     const navBarMobileBtn = container.querySelector("#nav-bar-mobile-btn");

    //     // const onHome = jest.fn();

    //     fireEvent.click(navBarMobileBtn)

    //     expect(setState).toHaveBeenCalledWith(newInputValue);
    // })
})