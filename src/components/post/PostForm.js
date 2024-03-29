import React from 'react'

import {Paper, Grid} from '@material-ui/core';

import AddPostItem from './AddPostItem'
import Posts from './Posts'

const PostForm = ({classes, firestore, alert, setAlert}) => {
    return (
        <Grid
            item 
            xs={8}
            >
            <Paper className={classes.paper}>
                <Grid
                    className={classes.SubGrid}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    item 
                    xs={12}
                >
                    <Paper className={classes.paper}>
                        <AddPostItem
                            classes={classes}
                            firestore={firestore}
                            alert={alert}
                            setAlert={setAlert}
                        />
                    </Paper>
                </Grid>
                <Posts
                    classes={classes}
                    firestore={firestore}
                    alert={alert}
                    setAlert={setAlert}
                />
            </Paper>
        </Grid>
    )
}

export default PostForm