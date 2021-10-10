import React, { useState } from 'react'

import CircularProgress from '@material-ui/core/CircularProgress';

import { ProfileUser } from '../components/account';
import { CardLayoutWithMedia, SnackBarHolder } from "../components/general";

import {Paper, Grid} from '@material-ui/core';

import { 
    updateState, 
    updateAlert, 
    uploadImage,
    updateProfileInfo
} from '../utilies'

import {
    useStyles
} from '../styles'

import PostForm from '../components/post/PostForm'

import {
    defaultAlert
} from '../constant'

import useProfile from '../hooks/useProfile';

const Profile = () => {
    const classes = useStyles();

    const { 
        isLoading, 
        list, 
        user, 
        signInCheckResult,
        profile, 
        setProfile,
        preview, 
        setPreview, 
        firestore,
        storage,
        reset,
        setReset,
        fileName, 
        setFileName,
        alert, 
        setAlert
    } = useProfile()

    if(isLoading){
        return <CircularProgress color="inherit" />
    }
    
    return (
        <div style={{margin: '1px', padding:'5px'}}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <CardLayoutWithMedia
                            header={'Profile'}
                            image={preview}
                            title={''}
                        >
                            <SnackBarHolder
                                classes={classes}
                                alert={alert}
                                onHandleClose={() => {
                                    updateAlert(null, null, !alert?.open, alert, setAlert)
                                }}
                            />
                            <ProfileUser
                                classes={classes}
                                signInCheckResult={signInCheckResult}
                                value={profile}
                                onChangeState={(e) => updateState(e, setProfile, profile)}
                                onChangeImage={(e) => uploadImage(e, setFileName, setPreview)}
                                file={fileName}
                                previewImageUrl={preview}
                                onSubmit={() => {
                                    updateProfileInfo(firestore, storage, user?.data, profile, fileName, alert, setAlert)
                                }}
                                isLoading={isLoading}
                            />
                        </CardLayoutWithMedia>
                    </Paper>
                </Grid>
                <PostForm 
                    classes={classes}
                    firestore={firestore}
                    user={user}
                    alert={alert}
                    setAlert={setAlert}
                    list={list}
                    setReset={setReset}
                    reset={reset}
                    isLoading={isLoading}
                />
            </Grid>
    </div>
    
    )
}

export default Profile