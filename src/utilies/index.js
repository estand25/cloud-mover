import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    updateProfile 
} from 'firebase/auth'

import { 
    doc, 
    updateDoc, 
    deleteDoc, 
    getDoc, 
    getDocs,
    setDoc,
    addDoc,
    collection,
    serverTimestamp,
    query,
    where,
} from 'firebase/firestore';

import { 
    deleteObject, 
    ref, 
    uploadBytesResumable, 
    getDownloadURL 
} from 'firebase/storage'

import {
    defaultPost
} from '../constant'

const updateState = (e, onChange, state) => {
    var updateStates = Object.assign(state, {});
    updateStates[e.target.name] = e.target.value;

    onChange({
        ...state,
        ...updateStates
    })
}

const updateAlert = (severity, text, open, alert, onUpdateAlert) => {
    var updateAlert = Object.assign(alert,{})
    
    if(severity != null)
        updateAlert.severity = severity;

    if(text != null)
        updateAlert.text = text;

    if(open != null)
        updateAlert.open = open;

    onUpdateAlert({
        ...alert,
        ...updateAlert
    })

}

const updateShowPassword = (onUpdateState, state, value) => {
    onUpdateState({...state, showPassword: value})
}

const handleMouseDownPassword = (e) => {
    e.preventDefault()
}

const routeHome = (alert, history) => {
    if(alert?.severity == 'success')
        history.push('/')
}

const logIn = (auth, logInObj, alert, setAlert) => {
    try {

        if(logInObj.email && logInObj.password)
        {
            signInWithEmailAndPassword(auth, logInObj.email, logInObj.password)
            .then(data => {
                updateAlert(
                    'success',
                    'Log-In account successfully',
                    true,
                    alert,
                    setAlert
                )
            })
            .catch(error => {
                updateAlert(
                    'error',
                    `Log-In was not sucessfully for the following reason: ${error} !`,
                    true,
                    alert,
                    setAlert
                )
            });
        }
        else
        {
            updateAlert(
                'error',
                'Email & password must be provider !',
                true,
                alert,
                setAlert
            )           
        }
    } catch (error) {
        updateAlert(
            'error',
            'Something went wrong while trying to log-in. Try again later!',
            true,
            alert,
            setAlert
        )
    }
}

const accountUpdated = (firestore, account, alert, setAlert) => {
    try {
        if(account.authProvider && account.name){
            const accountRef = doc(firestore, 'users', account.uid)

            updateDoc(accountRef,{
                authProvider: account.authProvider,
                name: account.name
            })
            .then(result => {
                updateAlert(
                    'success',
                    'Account successfully Updated',
                    true,
                    alert,
                    setAlert
                )
            })
            .catch(error => {
                updateAlert(
                    'error',
                    'Account could not be updated. Please try again later',
                    true,
                    alert,
                    setAlert
                )
            })
        }
        else
        {
            updateAlert(
                'error',
                'AuthProvider & name must be provider !',
                true,
                alert,
                setAlert
            )
        }
    } catch (error) {
        updateAlert(
            'error',
            'Something went wrong while trying to update the account. Try again later!',
            true,
            alert,
            setAlert
        )
    }
} 

const accountDelete = (storage, firestore, auth, account, alert, setAlert) => {
    const imageExt = account?.imageExt ?? null;
    if(imageExt != null){
        var storageInfo  =`images/${account.uid}/profile_image.${account.imageExt}`;
        const imageRef = ref(storage, storageInfo)
        deleteObject(imageRef)
    }

    if(account.uid)
    {   
        const accountRef = doc(firestore, 'users', account.uid)
        var delDoc = deleteDoc(accountRef);
    }

    auth.currentUser.delete()
    .then(result => {
        updateAlert(
            'success',
            'Profile successfully delete',
            true,
            alert,
            setAlert
        )
    })
    .catch(error => {
        updateAlert(
            'error',
            'Profile was not successfully delete',
            true,
            alert,
            setAlert
        )
    })
}

const uploadImage = (e, setFileName, setPreview) => {
    setFileName(e.target.files[0])
    setPreview(URL.createObjectURL(e.target.files[0]))
}

const updateProfileInfo = (firestore, storage, inUser, profile, fileName, alert, setAlert) => {
    try {
        if(profile?.displayName){
            updateProfile(inUser, {displayName: profile.displayName})
            .then((p) => {
                updateAlert(
                    'success',
                    'Profile successfully Updated',
                    true,
                    alert,
                    setAlert
                )
            })
            .catch((error) => {
                updateAlert(
                    'error',
                    'Profile updated was not successfully!',
                    true,
                    alert,
                    setAlert
                )
            })
        }

        const profileRef = doc(firestore, 'profiles', profile.uid)  

        setDoc(profileRef,{
            createDateUtc: serverTimestamp(),
            createdBy: profile?.displayName ?? profile?.uid,
            modifiedDateUtc: serverTimestamp(),
            modifiedBy: profile?.displayName ?? profile?.uid,
            dob: profile?.dob ?? new Date(),
            bio: profile?.bio ?? ''
        })
        .then(result => {
            updateAlert(
                'success',
                'Profile successfully Updated',
                true,
                alert,
                setAlert
            )
        })
        .catch(error => {
            updateAlert(
                'error',
                'Profile updated was not successfully!',
                true,
                alert,
                setAlert
            )
        })

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
                                    updateAlert(
                                        'success',
                                        'Profile successfully Updated',
                                        true,
                                        alert,
                                        setAlert
                                    )
                                })
                                .catch((error) =>{
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
        updateAlert(
            'error',
            'Something went wrong while trying to update the Profile. Try again later!',
            true,
            alert,
            setAlert
        )
    }
}

const createUser = (auth, firestore, reg, alert, setAlert) => {
    try {
        if(reg.name && reg.email && reg.password){
            createUserWithEmailAndPassword(auth, reg.email, reg.password)
            .then(res => {
                const user = res.user;
                const userDoc = doc(firestore, 'users', user.uid);
    
                setDoc(userDoc,{
                    uid: user.uid,
                    name: reg.name,
                    authProvider: "local",
                    email: reg.email,
                    password: reg.password
                })

                updateAlert(
                    'success',
                    'User has been successfully created',
                    true,
                    alert,
                    setAlert
                )

            })
            .catch(error => {
                updateAlert(
                    'error',
                    'User could not be created. Please try again later',
                    true,
                    alert,
                    setAlert
                )
            })
        }
        else
        {
            updateAlert(
                'error',
                'Name, email and password must be provider !',
                true,
                alert,
                setAlert
            )
        }
    }
    catch(err){
        updateAlert(
            'error',
            'User could not be created. Please try again later',
            true,
            alert,
            setAlert
        )
    }
}

const createPost = (firestore, user, setOpen, post, setPost, alert, setAlert) => {      
    try{
        if(post.title && post.text){
            post.createDateUtc = serverTimestamp();
            post.createBy = user.data.uid;
            post.modifiedDateUtc = serverTimestamp();
            post.modifiedBy = user.data.uid;
            post.replied = 'initial';
            post.favorite = false;
    
            const postRef = collection(firestore, 'posts')
    
            addDoc(postRef, {
                createDateUtc: post.createDateUtc,
                createBy: post.createBy,
                modifiedDateUtc: post.modifiedDateUtc,
                modifiedBy: post.modifiedBy,
                title: post.title,
                text: post.text,
                replied: post.replied
            })
            .then(result => {
                setPost(Object.assign({}, defaultPost))
              
                updateAlert(
                    'success',
                    'Post has been successfully created',
                    true,
                    alert,
                    setAlert
                )
    
                setOpen(false)
            })
            .catch(error => {
                updateAlert(
                    'error',
                    'Post could not be created. Please try again later',
                    true,
                    alert,
                    setAlert
                )
            })
        }
        else
        {
            updateAlert(
                'error',
                'Title and text must be provider !',
                true,
                alert,
                setAlert
            )               
        }
    }  catch (error) {
        updateAlert(
            'error',
            'Post could not be created. Please try again later',
            true,
            alert,
            setAlert
        )
    }
}

const onFavoriteChange = (firestore, id, favorite, alert, setAlert) => {
    try {
        const favorsRef = doc(firestore, 'posts', id)

        updateDoc(favorsRef, {
            favorite: favorite
        })
        .then(result => {
            updateAlert(
                'success',
                'Post favorite status has been successfully updated',
                true,
                alert,
                setAlert
            )
        })
        .catch(error => {
            updateAlert(
                'error',
                'Post favorite status updated has errored',
                true,
                alert,
                setAlert
            )

        })
    } catch (error) {
        updateAlert(
            'error',
            'Post favorite status updated has errored',
            true,
            alert,
            setAlert
        )
    }
}

const accountUseEffect = (firestore, user, account, setAccount) => {
    if(user.data){
        const userRef = doc(firestore, 'users', user?.data?.uid)

        getDoc(userRef)
            .then(result => {
                var updAccount = {};
                updAccount.authProvider = result?.data()?.authProvider ?? '';
                updAccount.imageExt = result?.data()?.imageExt ?? '';
                updAccount.name = result?.data()?.name ?? '';
                updAccount.uid = result?.data()?.uid ?? '';

                setAccount({...account,...updAccount})
            })
            .catch(error => {
                console.log('UseEffect Account Error', error)
            })
    }
}

const profileUseEffect = (firestore, user, profile, setProfile, setPreview) => {
    if(user.data){                       
        var updProfile = {};
        updProfile.displayName = user?.data?.displayName ?? '';
        updProfile.email = user?.data?.email ?? '';
        updProfile.photoURL = user?.data?.photoURL ?? '';
        updProfile.uid = user?.data?.uid ?? ''

        setProfile({
            ...profile,
            ...updProfile
        })

        const profileRef = doc(firestore, 'profiles', user?.data?.uid)

        getDoc(profileRef)
            .then(result => {
                var updProfile2 = Object.assign(updProfile, {})

                updProfile2.createDateUtc = result?.data()?.createDateUtc ?? '';
                updProfile2.createdBy = result?.data()?.createdBy ?? '';
                updProfile2.modifiedDateUtc = result?.data()?.modifiedDateUtc ?? '';
                updProfile2.modifiedBy = result?.data()?.modifiedBy ?? '';
                updProfile2.dob =  result?.data()?.dob ?? new Date();
                updProfile2.bio = result?.data()?.bio ?? ''

                setProfile({
                    ...profile,
                    ...updProfile2
                })
            })
            .catch(error => {
                console.log('UseEffect Account Error', error)
            })

        setPreview(updProfile.photoURL)
    }
}

const postsUseEffect = (firestore, user, setList) => {
    if(user.data){
        const postQuery = query(
            collection(firestore, 'posts'),
            where("createBy", "==", user.data.uid)
        )

        var newList = []
        getDocs(postQuery)
            .then(doc_ => {
                doc_.forEach((iDoc) => {
                    var newPost = iDoc.data();
                    newPost.id = iDoc.id;
                    newList.push(newPost)
                    // console.log('post',newPost )
                })
                setList(newList)
            })
    }
}

const editPost = (firestore, user, post, alert, setAlert) => {
    try {
        if(post.title && post.text){
            console.log('Updated Post', post)
            const postRef = doc(firestore, 'posts', post.id)
            console.log('post ref', postRef)

            updateDoc(postRef, {
                modifiedDateUtc: serverTimestamp(),
                modifiedBy: user.data.uid,
                title: post.title,
                text: post.text,
                replied: post.replied
            })
            .then(result => {
                updateAlert(
                    'success',
                    'Post has been successfully updated',
                    true,
                    alert,
                    setAlert
                )
            })
        }
    }  catch (error) {
        updateAlert(
            'error',
            'Post could not be created. Please try again later',
            true,
            alert,
            setAlert
        )
    }
}

export {
    updateState,
    updateAlert,
    updateShowPassword,
    handleMouseDownPassword,
    routeHome,
    logIn,
    accountUpdated,
    accountDelete,
    accountUseEffect,
    uploadImage,
    updateProfileInfo,
    createUser,
    createPost,
    onFavoriteChange,
    profileUseEffect,
    postsUseEffect,
    editPost
}