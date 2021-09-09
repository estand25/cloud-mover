import React, {useEffect, useState} from 'react'
import { useSigninCheck, useStorage } from "reactfire";

import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { updateProfile } from '@firebase/auth';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { NoProfilePresent } from '.';
import { UploadPhotoButton } from '../general'

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
}));

const Profile = () => {
    const classes = useStyles();
    const storage = useStorage();

    const {state: signInState, data: signInCheckResult} = useSigninCheck();
    const {user: inUser} = signInCheckResult ? signInCheckResult : {}
    const [fileName, setFileName] = useState({})
    const [preview, setPreview] = useState('')

    const [profile, setProfile] = useState({
        displayName: inUser?.displayName ?? '',
        email: inUser?.email ?? '',
        phoneNumber: inUser?.phoneNumber ?? '',
        photoURL: inUser?.photoURL ?? '',
        uid: inUser?.uid ?? ''
    })

    useEffect(() => {
        if(typeof(signInCheckResult?.user) !== 'undefined'){           
            var { user } = signInCheckResult
            console.log('useEffect', user)
            var updProfile = {};
            updProfile.displayName = user?.displayName ?? '';
            updProfile.email = user?.email ?? '';
            updProfile.phoneNumber = user?.phoneNumber ?? '';
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
        if(profile?.displayName){
            updateProfile(inUser, {displayName: profile?.displayName})
            .then((p) => {
                console.log('Profile displayName update')
            })
            .catch((error) =>[
                console.error('Error on upload', error)
            ])
        }

        if(profile?.email){
            updateProfile(inUser, {email: profile?.email})
            .then((p) => {
                console.log('Profile email update')
            })
            .catch((error) =>[
                console.error('Error on upload', error)
            ])
        }

        if(profile?.phoneNumber){
            updateProfile(inUser, {phoneNumber: profile?.phoneNumber})
            .then((p) => {
                console.log('Profile phoneNumber update')
            })
            .catch((error) =>[
                console.error('Error on upload', error)
            ])
        }

        if(fileName && fileName?.name){
            // Extension of file
            var exten = fileName.name.split('.')[1]
            
            // Content Type of file
            var contentType = fileName.type;

            // File location in Storage
            var newFileLocation = `images/${profile.uid}.${exten}`;
            const imageRef = ref(storage, newFileLocation)

            const metaData = {
                contentType: contentType
            };

            const uploadTask = uploadBytesResumable(imageRef, fileName, metaData)

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.error('error on Upload: ', error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            updateProfile(inUser, {photoURL: downloadURL})
                                .then((p) => {
                                    console.log('Profile image update')
                                })
                                .catch((error) =>[
                                    console.error('Error on upload', error)
                                ])
                        })
                })
        }

    }

    const uploadImage = (event) => {
        setFileName(event.target.files[0])
        setPreview(URL.createObjectURL(event.target.files[0]))
    }

    const updateState = (value, targetField) => {
        var updateValues = Object.assign(profile, {});
        updateValues[targetField] = value;

        setProfile({
            ...profile,
            ...updateValues
        })
    }

    if(!signInCheckResult || !signInCheckResult.signedIn){
        return <NoProfilePresent/>
    }
    else
    {
        return (
            <form className={classes.root}>
                <div>
                    <TextField
                        id="outlined-Display"
                        label="Display"
                        value={profile.displayName}
                        variant="outlined"
                        onChange={(e) => updateState(e.target.value,'displayName')}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-Email"
                        label="Email"
                        value={profile.email}
                        variant="outlined"
                        onChange={(e) => updateState(e.target.value,'email')}
                    />
                </div>
                <div>
                    <UploadPhotoButton
                        label={'Upload photo'}
                        onChange={uploadImage}
                        file={fileName}
                        previewImageUrl={preview}
                    />
                </div>
                <div>
                    <Button variant="outlined" onClick={updateProfileInfo}>
                        Update Profile
                    </Button>
                </div>
            </form>
        )
    }
}

export default Profile