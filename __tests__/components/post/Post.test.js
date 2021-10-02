import React from 'react'
import { render } from '@testing-library/react'
import { Post } from '../../../src/components/post'
import { defaultPost } from '../../../src/constant'

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

describe('Testing with positive param for posts', () => {
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
        const [post, setPost] = useObjectState(Object.assign({}, defaultPost))

        const firestore = reactFire.useFirestore()
        const user = reactFire.useUser()

        const postRender = render(
            <Post
                classes={classes}
                firestore={firestore}
                user={user}
                alert={alert}
                setAlert={setAlert}
                value={post}
                onChangeState={(e) => updateState(e, setPost, post)}
                postInputText={'Edit Post'}
            />
        )

        expect(postRender).toBeTruthy();
    })

})