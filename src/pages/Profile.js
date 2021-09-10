import React, {useEffect, useState} from 'react'
import { useSigninCheck, useStorage, useFirestore } from "reactfire";

import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { updateProfile } from '@firebase/auth';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { ProfileUser } from '../components/account';
import { useHistory } from 'react-router-dom'
import { CardLayoutWithMedia } from "../components/general";
import { doc, setDoc, updateDoc } from '@firebase/firestore';

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
    const firestore = useFirestore();
    const history = useHistory();

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
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
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

        history.push('/')
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

    return (
        <CardLayoutWithMedia
            header={'Profile'}
            image={preview}
            title={''}
        >
            <ProfileUser
                classes={classes}
                signInCheckResult={typeof(signInCheckResult?.user) !== 'undefined'}
                value={profile}
                onChangeState={updateState}
                onChangeImage={uploadImage}
                file={fileName}
                previewImageUrl={preview}
                onSubmit={updateProfileInfo}
            />
        </CardLayoutWithMedia>
    )
}

export default Profile