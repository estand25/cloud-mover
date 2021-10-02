import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {Card } from '@material-ui/core';
import Box from "@material-ui/core/Box";

const PostInput = ({classes, open, setOpen, addPost, value, onChangeState, postInputText}) => {
    return (        
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minWidth="550"
        >
            <Card className={classes.card}>
                <form className={classes.root}>
                    {
                        open == null ?
                            <></>
                        :
                            <div>
                                <IconButton
                                    onClick={() => setOpen(!open)}
                                >
                                    <CloseIcon/>
                                </IconButton>
                            </div>
                    }
                    <div>
                        <TextField
                            id="outlined-Title"
                            label="Title"
                            name="title"
                            value={value.title}
                            variant="outlined"
                            onChange={onChangeState}
                            required
                            error={!value.title}
                            helperText={!value.title ? "Post title is required" : ""}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-Post"
                            label="Post"
                            name="text"
                            multiline
                            required
                            rows={4}
                            value={value.text}
                            onChange={onChangeState}
                            variant="outlined"
                            error={!value.text}
                            helperText={!value.text ? "Post Text is required" : ""}
                        />
                    </div>
                    <div>
                        <Button variant="outlined" onClick={addPost}>
                            {postInputText}
                        </Button>
                    </div>
                </form>    
            </Card>   
        </Box>
    )
}

export default PostInput;