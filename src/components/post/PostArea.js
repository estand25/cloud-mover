import React from 'react'
import Button from '@material-ui/core/Button';
import PostInput from './PostInput'

const PostArea = ({ classes, open, setOpen, addPost, value, onChangeState }) => {
    return (
        <>
            {open ? 
                <PostInput
                    classes={classes}
                    open={open}
                    setOpen={setOpen}
                    addPost={addPost}
                    value={value}
                    onChangeState={onChangeState}
                    postInputText={'Post'}
                />
            :
                <div>
                    <Button 
                        data-testid="outline-SetOpen"
                        variant="outlined" 
                        onClick={setOpen}
                    >
                        Post
                    </Button>
                </div>
            }
        </>
    )
}

export default PostArea;