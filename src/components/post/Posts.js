import React from 'react'
import Post from './Post'
import {Grid} from '@material-ui/core';

import { 
    updateState
} from '../../utilies'

const Posts = ({classes, firestore, user, alert, setAlert, list, isLoading}) => {
    if(isLoading){
        return (
            <div>
                {'No Posts'}
            </div>
        )
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >   
            {list?.map(item => { 
                return (
                    <Post
                        key={item?.id}
                        classes={classes}
                        firestore={firestore}
                        user={user}
                        alert={alert}
                        setAlert={setAlert}
                        value={item}
                        onChangeState={(e) => updateState(e, setPost, item)}
                        postInputText={'Edit Post'}
                    />
                )
            })}
        </Grid>
    )
}

export default Posts