import React from 'react'
import { render, fireEvent, screen} from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

import useMyAccount from '../../src/hooks/useMyAccount'

import {
    defaultMyAccount
} from '../../src/constant'


import * as reactFire from 'reactfire'

jest.mock("reactfire", () => {
    return {
        useFirestore: jest.fn(),
        useUser: jest.fn().mockResolvedValue({
            user: {
                data: "fakeUid",
             },
           }),
        useStorage: jest.fn(),
        useAuth: jest.fn(),
    }
})

jest.mock('../../src/hooks/useMyAccount')

describe('use My Account hook', () => {   
    it('initial useMyAccount state', () => {
        const firestore = reactFire.useFirestore();
        const user = reactFire.useUser();
        const storage = reactFire.useStorage();
        const auth = reactFire.useAuth();

        const {
            result
        } = renderHook(() => useMyAccount())

        expect(result.current).toStrictEqual(undefined)
    })
    // it('data is fetched and loading', async () => {
    //     const firestore = reactFire.useFirestore();
    //     const user = reactFire.useUser();
    //     const storage = reactFire.useStorage();
    //     const auth = reactFire.useAuth();

    //     const isLoading = false;
    //     const onSetAccount = jest.fn()

    //     const fakeData = {
    //         isLoading, 
    //         defaultMyAccount, 
    //         onSetAccount,
    //         firestore,
    //         storage,
    //         auth
    //     }

    //     const { result, waitForNextUpdate } = renderHook(() => useMyAccount())

    //     expect(result.current).toBe(undefined)

    //     await act(() => waitForNextUpdate());

    //     expect(result.current).toBe(undefined)
    // })
})