import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { SignUp } from '../../src/pages'

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

import { 
    updateState, 
    updateAlert, 
    updateShowPassword, 
    handleMouseDownPassword, 
    routeHome,
    createUser
} from '../../src/utilies'

jest.mock("../../src/utilies", () => {
    return {
        updateState: jest.fn(), 
        updateAlert: jest.fn(),  
        updateShowPassword: jest.fn(),  
        handleMouseDownPassword: jest.fn(), 
        routeHome: jest.fn(), 
        createUser: jest.fn()
    }
})

// Clear mock data before each test
beforeEach(() => {
    updateState.mockClear(), 
    updateAlert.mockClear(),  
    updateShowPassword.mockClear(),   
    handleMouseDownPassword.mockClear(), 
    routeHome.mockClear(),  
    createUser.mockClear()
  });

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

describe('Testing interactions SignUp', () => {
    it('name is present', () => {
        const { container } =  render(<SignUp />);
        const name = container.querySelector('#outlined-name');
        expect(name).toBeTruthy();
    })
    it('email is present', () => {
        const { container } =  render(<SignUp />);
        const email = container.querySelector('#outlined-email');
        expect(email).toBeTruthy();
    })
    it('password is present', () => {
        const { container } =  render(<SignUp />);
        const password = container.querySelector('#outlined-password');
        expect(password).toBeTruthy();
    })
    it('password is present and visible', () => {
        const { container } =  render(<SignUp />);
        const password = container.querySelector('#outlined-password');
        const passwordEyeIcon = container.querySelector('#password-eye-icon');

        fireEvent.change(password, {target: {value: 'password'}})
        fireEvent.click(passwordEyeIcon)

        expect(updateShowPassword).toHaveBeenCalledTimes(1)
        expect(password).toBeTruthy();
    })
    it('Populate name, email, and password with Sign-Up', () => {
        const { container } =  render(<SignUp />);
        const name = container.querySelector('#outlined-name');
        const email = container.querySelector('#outlined-email');
        const password = container.querySelector('#outlined-password');
        const SignUpBtn = container.querySelector('#SignUpBtn')    

        fireEvent.change(name, {target: {value: 'ename'}})
        fireEvent.change(email, {target: {value: 'email@email.com'}})
        fireEvent.change(password, {target: {value: 'password'}})
        fireEvent.click(SignUpBtn)

        expect(updateState).toHaveBeenCalledTimes(3)
        expect(createUser).toHaveBeenCalledTimes(1)
    })
})