import React from 'react'
import { render } from '@testing-library/react'
import { AddPostItem } from '../../../src/components/post'
import * as reactFire from 'reactfire'

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

    const useObjectState = (defaultValue) => {
        let value = Object.assign(defaultValue,{})
        const getValue = value
        const setValue = newValue => value = newValue
        return [getValue, setValue];
    }

    it('render without crashing', () => {
        const [alert, setAlert] = useObjectState({
            severity: 'error',
            text: 'test1',
            open: false
        })

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
    })
})