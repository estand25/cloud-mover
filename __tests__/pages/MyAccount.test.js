import React from 'react'
import '@testing-library/react/dont-cleanup-after-each'
import { render, fireEvent, screen} from '@testing-library/react'
import { MyAccount } from '../../src/pages'
import * as reactFire from 'reactfire'

import { 
    updateState, 
    updateAlert, 
    routeHome,
    accountUpdated,
    accountDelete,
    accountUseEffect
} from '../../src/utilies'

import useMyAccount from '../../src/hooks/useMyAccount'

import {
    defaultMyAccount
} from '../../src/constant'

jest.mock("../../src/utilies", () => {
    return {
        updateState: jest.fn(), 
        updateAlert: jest.fn(),  
        routeHome: jest.fn(), 
        accountUpdated: jest.fn(), 
        accountDelete: jest.fn(), 
        accountUseEffect: jest.fn()
    }
})

jest.mock("../../src/hooks/useMyAccount")

// Clear mock data before each test
beforeEach(() => {
    updateState.mockClear(), 
    updateAlert.mockClear(),  
    routeHome.mockClear(),   
    accountUpdated.mockClear(), 
    accountDelete.mockClear(),  
    accountUseEffect.mockClear()
  });

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
        useMyAccount.mockResolvedValue(() => () => {
            return {
                isLoading: true,
                account: defaultMyAccount
            }
        })

        const myAccount = render(
            <MyAccount />
        )

        expect(myAccount).toBeTruthy();
    })
})

describe('Testing with MyAccount with interaction skelaton', () => {
    it('name is present', () => {
        useMyAccount.mockResolvedValue({
            isLoading: true,
            account: defaultMyAccount,
            setAccount: jest.fn()
        })

        const { getAllByTestId } =  render(<MyAccount />);
        const name = getAllByTestId("outline-name")
        expect(name).toBeTruthy();
    })

    it('AuthProvider is present', () => {
        useMyAccount.mockResolvedValue({
            isLoading: true,
            account: defaultMyAccount,
            setAccount: jest.fn()
        })

        const { getAllByTestId } =  render(<MyAccount />);
        const authProvider = getAllByTestId('outline-authProvider');
        expect(authProvider).toBeTruthy();
    })

    it('uid is present', () => {
        useMyAccount.mockResolvedValue({
            isLoading: true,
            account: defaultMyAccount,
            setAccount: jest.fn()
        })
        
        const { getAllByTestId } =  render(<MyAccount />);
        const uid = getAllByTestId('outline-uid');
        expect(uid).toBeTruthy();
    })

    it('change account btn is present', () => {
        useMyAccount.mockResolvedValue({
            isLoading: true,
            account: {
                authProvider: '',
                name: '',
                imageExt: '',
                uid: ''
            },
            setAccount: jest.fn()
        })
        
        const { container } =  render(<MyAccount />);
        const oChangeAccountBtn = container.querySelector('#outlined-change-account');
        expect(oChangeAccountBtn).toBeTruthy();
    })

    it('delete account btn is present', () => {
        useMyAccount.mockResolvedValue({
            isLoading: true,
            account: {
                authProvider: '',
                name: '',
                imageExt: '',
                uid: ''
            },
        })
        
        const { container } =  render(<MyAccount />);
        const oDeleteAccountBtn = container.querySelector('#outlined-delete-account');
        expect(oDeleteAccountBtn).toBeTruthy();
    })
})

describe('Testing with MyAccount with interaction with data', () => {
    it('name is present', () => {
        const storage = reactFire.useStorage();
        const auth = reactFire.useAuth();

        useMyAccount.mockResolvedValue({
            isLoading: false,
            account: {
                authProvider: 'auth',
                name: 'name',
                imageExt: '',
                uid: 'uid'
            },
            setAccount: jest.fn(),
            storage: storage,
            auth: auth
        })

        const { getAllByTestId } =  render(<MyAccount />);
        const name = getAllByTestId("outline-name")
        expect(name).toBeTruthy();
    })

    it('AuthProvider is present', () => {
        const storage = reactFire.useStorage();
        const auth = reactFire.useAuth();

        useMyAccount.mockResolvedValue({
            isLoading: false,
            account: {
                authProvider: 'auth',
                name: 'name',
                imageExt: '',
                uid: 'uid'
            },
            setAccount: jest.fn(),
            storage: storage,
            auth: auth
        })

        const { getAllByTestId } =  render(<MyAccount />);
        const authProvider = getAllByTestId('outline-authProvider');
        expect(authProvider).toBeTruthy();
    })

    it('uid is present', () => {
        const storage = reactFire.useStorage();
        const auth = reactFire.useAuth();

        useMyAccount.mockResolvedValue({
            isLoading: false,
            account: {
                authProvider: 'auth',
                name: 'name',
                imageExt: '',
                uid: 'uid'
            },
            setAccount: jest.fn(),
            storage: storage,
            auth: auth
        })

        const { getAllByTestId } =  render(<MyAccount />);
        const uid = getAllByTestId('outline-uid');
        expect(uid).toBeTruthy();
    })

    it('change account btn is present', () => {
        const storage = reactFire.useStorage();
        const auth = reactFire.useAuth();

        useMyAccount.mockResolvedValue({
            isLoading: false,
            account: {
                authProvider: 'auth',
                name: 'name',
                imageExt: '',
                uid: 'uid'
            },
            setAccount: jest.fn(),
            storage: storage,
            auth: auth
        })

        const { container } =  render(<MyAccount />);
        const oChangeAccountBtn = container.querySelector('#outlined-change-account');
        expect(oChangeAccountBtn).toBeTruthy();
    })

    it('delete account btn is present', () => {
        const storage = reactFire.useStorage();
        const auth = reactFire.useAuth();

        useMyAccount.mockResolvedValue({
            isLoading: false,
            account: {
                authProvider: 'auth',
                name: 'name',
                imageExt: '',
                uid: 'uid'
            },
            setAccount: jest.fn(),
            storage: storage,
            auth: auth
        })

        const { container } =  render(<MyAccount />);
        const oDeleteAccountBtn = container.querySelector('#outlined-delete-account');
        expect(oDeleteAccountBtn).toBeTruthy();
    })

    it('Change name & AuthProvider to blank and click Change', () => {
        const firestore = reactFire.useFirestore();
        const storage = reactFire.useStorage();
        const auth = reactFire.useAuth();

        useMyAccount.mockResolvedValue({
            isLoading: false,
            account: {
                authProvider: 'auth',
                name: 'name',
                imageExt: '',
                uid: 'uid'
            },
            setAccount: jest.fn(),
            firestore: firestore,
            storage: storage,
            auth: auth
        })

        const { container } =  render(<MyAccount />);
        const name = screen.getAllByTestId('outline-name')[0].querySelector('input');
        const authProvider = screen.getAllByTestId('outline-authProvider')[0].querySelector('input');
        const oChangeAccountBtn = container.querySelector('#outlined-change-account');

        fireEvent.change(name, {target: {value: ''}})
        fireEvent.change(authProvider, {target: {value: ''}})
        fireEvent.click(oChangeAccountBtn)

        expect(accountUpdated).toHaveBeenCalledTimes(1)
    })

    it('Change name & AuthProvider to values and click Change', () => {
        const firestore = reactFire.useFirestore();
        const storage = reactFire.useStorage();
        const auth = reactFire.useAuth();

        useMyAccount.mockResolvedValue({
            isLoading: false,
            account: {
                authProvider: 'auth',
                name: 'name',
                imageExt: '',
                uid: 'uid'
            },
            setAccount: jest.fn(),
            firestore: firestore,
            storage: storage,
            auth: auth
        })

        const { container } =  render(<MyAccount />);
        const name = screen.getAllByTestId('outline-name')[0].querySelector('input');
        const authProvider = screen.getAllByTestId('outline-authProvider')[0].querySelector('input');
        const oChangeAccountBtn = container.querySelector('#outlined-change-account');
        
        fireEvent.change(name, {target: {value: 'name'}})
        fireEvent.change(authProvider, {target: {value: 'authProvider'}})
        fireEvent.click(oChangeAccountBtn)

        expect(accountUpdated).toHaveBeenCalledTimes(1)
        expect(updateState).toHaveBeenCalledTimes(2)
    })

    it('Change name & AuthProvider to values and click Delete', () => {
        const firestore = reactFire.useFirestore();
        const storage = reactFire.useStorage();
        const auth = reactFire.useAuth();

        useMyAccount.mockResolvedValue({
            isLoading: false,
            account: {
                authProvider: 'auth',
                name: 'name',
                imageExt: '',
                uid: 'uid'
            },
            setAccount: jest.fn(),
            firestore: firestore,
            storage: storage,
            auth: auth
        })

        const { container } =  render(<MyAccount />);
        const oDeleteAccountBtn = container.querySelector('#outlined-delete-account');
        
        fireEvent.click(oDeleteAccountBtn)

        expect(accountDelete).toHaveBeenCalledTimes(1)
    })
})