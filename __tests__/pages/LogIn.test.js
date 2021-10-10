import React from 'react'
import '@testing-library/react/dont-cleanup-after-each'
import { render, fireEvent } from '@testing-library/react'
import { LogIn } from '../../src/pages'

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

import { 
    updateState, 
    updateAlert, 
    updateShowPassword, 
    handleMouseDownPassword, 
    routeHome,
    logIn
} from '../../src/utilies'

jest.mock("../../src/utilies", () => {
    return {
        updateState: jest.fn(), 
        updateAlert: jest.fn(),  
        updateShowPassword: jest.fn(),  
        handleMouseDownPassword: jest.fn(), 
        routeHome: jest.fn(), 
        logIn: jest.fn()
    }
})

// Clear mock data before each test
beforeEach(() => {
    updateState.mockClear(), 
    updateAlert.mockClear(),  
    updateShowPassword.mockClear(),   
    handleMouseDownPassword.mockClear(), 
    routeHome.mockClear(),  
    logIn.mockClear()
  });

jest.mock("reactfire", () => {
    return {
        useAuth: jest.fn(),
        useFirestore: jest.fn()
    }
})

describe('Testing with positive param', () => {
    it('Render without crashing', () => {
        const logInPage = render(
            <LogIn />
        )

        expect(logInPage).toBeTruthy();
    })
})

describe('Testing when log-In interaction', () => {
    it('email is present', () => {
        const { container } =  render(<LogIn />);
        const email = container.querySelector('#outlined-email');
        expect(email).toBeTruthy();
    })

    it('password is present', () => {
        const { container } =  render(<LogIn />);
        const password = container.querySelector('#outlined-password');
        expect(password).toBeTruthy();
    })

    it('Log-In button present', () => {
        const { container } = render(<LogIn/>);
        const logInBtn = container.querySelector('#logInBtn')        
        expect(logInBtn).toBeTruthy();
    })

    it('Attempt log-in without Email & Password', () => {
        const { container } =  render(<LogIn />);
        const email = container.querySelector('#outlined-email');
        const password = container.querySelector('#outlined-password');
        const logInBtn = container.querySelector('#logInBtn')    

        fireEvent.change(email, {target: {value: ''}})
        fireEvent.change(password, {target: {value: ''}})
        fireEvent.click(logInBtn)
        expect(logIn).toHaveBeenCalledTimes(1)
    })

    it('password is present and visible', () => {
        const { container } =  render(<LogIn />);
        const password = container.querySelector('#outlined-password');
        const passwordEyeIcon = container.querySelector('#password-eye-icon');

        fireEvent.change(password, {target: {value: 'password'}})
        fireEvent.click(passwordEyeIcon)

        expect(updateShowPassword).toHaveBeenCalledTimes(1)
        expect(password).toBeTruthy();
    })

    it('Attempt log-in with valid Email, but not Password', () => {
        const { container } =  render(<LogIn />);
        const email = container.querySelector('#outlined-email');
        const password = container.querySelector('#outlined-password');
        const logInBtn = container.querySelector('#logInBtn')    

        fireEvent.change(email, {target: {value: 'email@email.com'}})
        fireEvent.change(password, {target: {value: ''}})
        fireEvent.click(logInBtn)
        expect(updateState).toHaveBeenCalledTimes(1)
        expect(logIn).toHaveBeenCalledTimes(1)
    })

    it('Log-In with valid Email & Password', () => {
        const { container } =  render(<LogIn />);
        const email = container.querySelector('#outlined-email');
        const password = container.querySelector('#outlined-password');
        const logInBtn = container.querySelector('#logInBtn')    

        fireEvent.change(email, {target: {value: 'email@email.com'}})
        fireEvent.change(password, {target: {value: 'password'}})
        fireEvent.click(logInBtn)

        expect(updateState).toHaveBeenCalledTimes(2)
        expect(logIn).toHaveBeenCalledTimes(1)
    })
})


