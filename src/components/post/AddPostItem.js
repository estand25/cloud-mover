import React, {useState} from 'react'

import PostArea from './PostArea';

import { 
    updateState,
    createPost
} from '../../utilies'

import {
    defaultPost
} from '../../constant'

const AddPostItem = ({classes, firestore, user, alert, setAlert}) => {
    const [open, setOpen] = useState(true)
    const [post, setPost] = useState(Object.assign({}, defaultPost))

    return (
        <PostArea
            classes={classes}
            open={!open}
            setOpen={() => setOpen(!open)}
            addPost={() => {
                createPost(firestore, user, setOpen, post, setPost, alert, setAlert)
                setOpen(false)
            }}
            onChangeState={(e) => updateState(e, setPost, post)}
            value={post}
        />
    )
}

export default AddPostItem;
