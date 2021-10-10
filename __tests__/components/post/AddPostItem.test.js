import { render } from '@testing-library/react'
import { AddPostItem } from '../../../src/components/post'
import * as reactFire from 'reactfire'
import * as React from 'react'

jest.mock("reactfire", () => {
    return {
        useUser: jest.fn(),
        useFirestore: jest.fn()
    }
})

describe('Testing with positive param', () => {
    const classes = {
        card: {},
        root: {},
        marginPhoto: {},
        textFieldPhoto: {}
    }

    it('render without crashing', () => {
        const setAlert = jest.fn();
        const useAlertSpy = jest.spyOn(React, 'useState')
        useAlertSpy.mockImplementation((alert) => [alert, setAlert]);
        const firestore = reactFire.useFirestore();

        const addPostItem = render(
            <AddPostItem
                classes={classes}
                firestore={firestore}
                alert={alert}
                setAlert={setAlert}
            />
        )

        expect(addPostItem).toBeTruthy();
        expect(setAlert).toBeTruthy();
    })
})

// describe('Testing with AddPostItem Interaction', () => {
//     it('')
// })