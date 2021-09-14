import React, {useEffect, useState} from 'react'
import { useStorage, useFirestore, useUser } from "reactfire";

import CircularProgress from '@material-ui/core/CircularProgress';

import { ProfileUser } from '../components/account';
import { CardLayoutWithMedia, SnackBarHolder } from "../components/general";

import {Paper, Grid} from '@material-ui/core';

import { 
    updateState, 
    updateAlert, 
    uploadImage,
    updateProfileInfo,
    profileUseEffect
} from '../utilies'

import {
    useStyles
} from '../styles'

import PostForm from '../components/post/PostForm'

import {
    defaultProfile,
    defaultAlert
} from '../constant'

const Profile = () => {
    const classes = useStyles();
    const storage = useStorage();
    const firestore = useFirestore();
    const user = useUser();

    const [fileName, setFileName] = useState({})
    const [preview, setPreview] = useState('')

    const [profile, setProfile] = useState(defaultProfile)
    const [alert, setAlert] = useState(defaultAlert)

    useEffect(() => {
        profileUseEffect(firestore, user, profile, setProfile, setPreview)
    }, [user.data])

    if(!profile.email){
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
                                    updateAlert(null, null, !alert.open, alert, setAlert)
                                }}
                            />
                            <ProfileUser
                                classes={classes}
                                signInCheckResult={(user.data)}
                                value={profile}
                                onChangeState={(e) => updateState(e, setProfile, profile)}
                                onChangeImage={(e) => uploadImage(e, setFileName, setPreview)}
                                file={fileName}
                                previewImageUrl={preview}
                                onSubmit={() => {
                                    updateProfileInfo(firestore, storage, user.data, profile, fileName, alert, setAlert)
                                }}
                            />
                        </CardLayoutWithMedia>
                    </Paper>
                </Grid>
                <PostForm 
                    classes={classes}
                    firestore={firestore}
                    alert={alert}
                    setAlert={setAlert}
                />
            </Grid>
    </div>
    
    )
}

export default Profile