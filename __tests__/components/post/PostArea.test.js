import React from 'react'
import { render } from '@testing-library/react'
import { PostArea } from '../../../src/components/post'
import { defaultPost } from '../../../src/constant'

describe('Testing with positive param for PostArea', () => {
    const classes = {
        card: {},
        root: {}
    }

    const useObjectState = (defaultValue) => {
        let value = Object.assign(defaultValue,{})
        const getValue = value
        const setValue = newValue => value = newValue
        return [getValue, setValue];
    }

    const useState = (defaultValue) => {
        let value = defaultValue;
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

        const [open, setOpen] = useState(false)
        const [post, setPost] = useObjectState(Object.assign({}, defaultPost))

        const addPost = () => {}
        const updateState = (e, setPost, post) => {}

        const postArea = render(
            <PostArea
                classes={classes}
                open={true}
                setOpen={() => {}}
                addPost={addPost}
                onChangeState={(e) => updateState(e, setPost, post)}
                value={post}
            />
        )

        expect(postArea).toBeTruthy();
    })

    it('render without crashing when Open', () => {
        const [post, setPost] = useObjectState(Object.assign({}, defaultPost))

        const addPost = () => {}
        const updateState = (e, s, a) => {}

        const postArea = render(
            <PostArea
                classes={classes}
                open={false}
                setOpen={() => {}}
                addPost={addPost}
                onChangeState={(e) => updateState(e, setPost, post)}
                value={post}
            />
        )

        expect(postArea).toBeTruthy();
    })
})