import React from 'react'
import { render } from '@testing-library/react'
import { PostItem } from '../../../src/components/post'
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

describe('Testing with positive param for PostItem', () => {
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

        const firestore = reactFire.useFirestore()
        const id = 1;
        const title = 'title';
        const favorite = false;
        const text = 'test';
        const setEdit = () => {}

        const postItem = render(
            <PostItem
                id={id}
                title={title}
                favorite={favorite}
                alert={alert}
                setAlert={setAlert}
                firestore={firestore}
                setEdit={setEdit}
            >
                <div>{text}</div>
            </PostItem>
        )

        expect(postItem).toBeTruthy();
    })
})