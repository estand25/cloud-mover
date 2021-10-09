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


jest.mock("firebase/firestore", () => {
    return {
        doc: jest.fn().mockResolvedValue({
            data: 'xxxxx'
        }),
        getDoc: jest.fn().mockResolvedValue({
            data: jest.fn().mockResolvedValue({
                authProvider: "email",
                imageExt: 'test.jpg',
                name: 'Test',
                uid: 'fakeId'
            })
        }),
        updateDoc: jest.fn().mockResolvedValue({
            data: jest.fn()
        }),
        deleteDoc: jest.fn().mockResolvedValue({
            data: jest.fn()
        }),
        setDoc: jest.fn().mockResolvedValue({
            data: jest.fn()
        }),
        getDocs: jest.fn().mockResolvedValue({
            data: [{}]
        }),
        query: jest.fn(),
        collection: jest.fn(),
        where: jest.fn()
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
        const user = {
            data: {}
        }

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