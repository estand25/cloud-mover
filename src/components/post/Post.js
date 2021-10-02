import React, { useState } from 'react'

import PostInput from './PostInput'
import PostItem from './PostItem'

import { 
    updateState,
    editPost
} from '../../utilies'

const Post = (props) => {
    const { classes, value, postInputText, alert, setAlert, firestore, user } = props

    const { id, title, favorite, text} = value
    const [post, setPost] = useState(Object.assign({}, value))
    const [edit, setEdit] = useState(false);

    return (
        edit ?
            <PostInput
                classes={classes}
                open={true}
                setOpen={() => setEdit(!edit)}
                addPost={() => {
                    editPost(firestore, user, post, alert, setAlert)
                    setEdit(false)
                }}
                value={post}
                onChangeState={(e) => updateState(e, setPost, post)}
                postInputText={postInputText}
            />
        :
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
}

export default Post;