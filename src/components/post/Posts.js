import React, { useEffect, useState} from 'react'

import Post from './Post'

import {Grid} from '@material-ui/core';

import { 
    updateState,
    postsUseEffect
} from '../../utilies'

const Posts = ({classes, firestore, user, alert, setAlert}) => {
    const [list, setList] = useState([])

    useEffect(() => {
        postsUseEffect(firestore, user, setList)
    },[user.data, list])


    if(list.length == 0){
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
            {list.map(item => { 
                return (
                    <Post
                        key={item.id}
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