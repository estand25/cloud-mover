import React, {useEffect, useState} from 'react'
import { useSigninCheck, useStorage, useFirestore } from "reactfire";

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'

import { ProfileUser } from '../components/account';
import { CardLayoutWithMedia, SnackBarHolder } from "../components/general";

import { 
    updateState, 
    updateAlert, 
    routeHome,
    uploadImage,
    updateProfileInfo
} from '../utilies'

import {
    useStyles
} from '../styles'

const Profile = () => {
    const classes = useStyles();
    const storage = useStorage();
    const firestore = useFirestore();
    const history = useHistory();

    const {state: signInState, data: signInCheckResult} = useSigninCheck();
    const {user: inUser} = signInCheckResult ? signInCheckResult : {}
    const [fileName, setFileName] = useState({})
    const [preview, setPreview] = useState('')

    const [profile, setProfile] = useState({
        displayName: inUser?.displayName ?? '',
        email: inUser?.email ?? '',
        photoURL: inUser?.photoURL ?? '',
        uid: inUser?.uid ?? ''
    })
    
    const [alert, setAlert] = useState({
        severity: '',
        text: '',
        open: false
    })

    useEffect(() => {
        if(typeof(signInCheckResult?.user) !== 'undefined'){           
            var { user } = signInCheckResult
            console.log('useEffect', user)
            var updProfile = {};
            updProfile.displayName = user?.displayName ?? '';
            updProfile.email = user?.email ?? '';
            updProfile.photoURL = user?.photoURL ?? '';
            updProfile.uid = user?.uid ?? ''

            setProfile({
                ...profile,
                ...updProfile
            })

            setPreview(updProfile.photoURL)
        }
    }, [signInCheckResult])

    if(signInState === 'loading'){
        return <CircularProgress color="inherit" />
    }

    return (
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
                    routeHome(alert, history)
                }}
            />
            <ProfileUser
                classes={classes}
                signInCheckResult={typeof(signInCheckResult?.user) !== 'undefined'}
                value={profile}
                onChangeState={(e) => updateState(e, setProfile, profile)}
                onChangeImage={(e) => uploadImage(e, setFileName, setPreview)}
                file={fileName}
                previewImageUrl={preview}
                onSubmit={() => {
                    updateProfileInfo(firestore, storage, inUser, profile, fileName, alert, setAlert)
                }}
            />
        </CardLayoutWithMedia>
    )
}

export default Profile