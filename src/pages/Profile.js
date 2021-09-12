import React, {useEffect, useState} from 'react'
import { useSigninCheck, useStorage, useFirestore } from "reactfire";

import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { updateProfile, updateEmail, updatePhoneNumber } from '@firebase/auth';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import { doc, setDoc, updateDoc } from '@firebase/firestore';

import { ProfileUser } from '../components/account';
import { CardLayoutWithMedia, SnackBarHolder } from "../components/general";

import { updateState, updateAlert, routeHome } from '../utilies'

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      '& .MuiButton-root': {
        margin: theme.spacing(1),
        width: '25ch',
      }
    },
    margin: {
        margin: theme.spacing(1),
      },
    textField: {
        width: '25ch',
    },   
    marginPhoto: {
        margin: theme.spacing(1),
        alignItems: 'center'
    },
    textFieldPhoto: {
        width: '25ch',
        alignItems: 'center'
    },
    snackbar: {
        width: '100%',
        '& > * + *': {
        marginTop: theme.spacing(2),
        },
    },
  }));

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

    const updateProfileInfo = () => {
        try {
            if(profile?.displayName){
                updateProfile(inUser, {displayName: profile.displayName})
                .then((p) => {
                    console.log('Profile displayName update')
                    
                    updateAlert(
                        'success',
                        'Profile successfully Updated',
                        true,
                        alert,
                        setAlert
                    )
                })
                .catch((error) => {
                    console.error('Error on upload', error)
                    updateAlert(
                        'error',
                        'Profile updated was not successfully!',
                        true,
                        alert,
                        setAlert
                    )
                })
            }

            if(fileName && fileName?.name){

                // Extension of file
                var exten = fileName.name.split('.')[1]

                // Create ref to user document
                var userRef = doc(firestore, 'users', profile?.uid)

                //add record for file extension
                updateDoc(userRef, {
                    imageExt: exten
                })
                .then(result => {
                    console.log('Image Extension added to user doc')
                })
                .catch(error => {
                    console.error('Error on adding image field', error)
                    updateAlert(
                        'error',
                        'Profile updated was not successfully!',
                        true,
                        alert,
                        setAlert
                    )
                })
                
                // Content Type of file
                var contentType = fileName.type;
                

                // File location in Storage
                var newFileLocation = `images/${profile.uid}/profile_image.${exten}`;
                const imageRef = ref(storage, newFileLocation)

                const metaData = {
                    contentType: contentType
                };

                const uploadTask = uploadBytesResumable(imageRef, fileName, metaData)

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    },
                    (error) => {
                        console.error('error on Upload: ', error)
                        updateAlert(
                            'error',
                            'Profile updated was not successfully!',
                            true,
                            alert,
                            setAlert
                        )
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadURL) => {
                                updateProfile(inUser, {photoURL: downloadURL})
                                    .then((p) => {
                                        console.log('Profile image update')
                                        updateAlert(
                                            'success',
                                            'Profile successfully Updated',
                                            true,
                                            alert,
                                            setAlert
                                        )
                                    })
                                    .catch((error) =>{
                                        console.error('Error on upload', error)
                                        updateAlert(
                                            'error',
                                            'Profile updated was not successfully!',
                                            true,
                                            alert,
                                            setAlert
                                        )
                                    })
                            })
                    })
            }

        } catch (error) {
            console.error(error, 'err')

            updateAlert(
                'error',
                'Something went wrong while trying to update the Profile. Try again later!',
                true,
                alert,
                setAlert
            )
        }
    }

    const uploadImage = (event) => {
        setFileName(event.target.files[0])
        setPreview(URL.createObjectURL(event.target.files[0]))
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
                onChangeImage={uploadImage}
                file={fileName}
                previewImageUrl={preview}
                onSubmit={updateProfileInfo}
            />
        </CardLayoutWithMedia>
    )
}

export default Profile