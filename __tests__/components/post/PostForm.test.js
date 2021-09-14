import React from 'react'
import { render } from '@testing-library/react'
import { PostForm } from '../../../src/components/post'

import * as reactFire from 'reactfire'

jest.mock("reactfire", () => {
    return {
        useFirestore: jest.fn(),
        useUser:  jest.fn().mockResolvedValue({
            user: {
                data: "fakeUid",
             },
           }),
    }
})

describe('Testing with positive param for PostForm', () => {
    const classes = {
        card: {},
        root: {},
        paper: {},
        SubGrid: {}
    }

    const useObjectState = (defaultValue) => {
        let value = Object.assign(defaultValue,{})
        const getValue = value
        const setValue = newValue => value = newValue
        return [getValue, setValue];
    }

    it('render without crashing when closed', () => {
        const [alert, setAlert] = useObjectState({
            severity: 'error',
            text: 'test1',
            open: false
        })

        const firestore = reactFire.useFirestore()

        const postForm = render(
            <PostForm
                classes={classes}
                firestore={firestore}
                alert={alert}
                setAlert={setAlert}
            />
        )

        expect(postForm).toBeTruthy();
    })

})