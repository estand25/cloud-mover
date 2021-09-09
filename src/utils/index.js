// import { initializeApp } from "firebase/app";
// import { 
//     getAuth, 
//     createUserWithEmailAndPassword, 
//     signInWithEmailAndPassword,
//     signOut,
//     deleteUser
// } from 'firebase/auth'
// import { 
//     getFirestore, 
//     collection, 
//     addDoc, 
//     deleteDoc,
//     getDoc,
//     setDoc,
//     doc,
//     query,
//     where
// } from 'firebase/firestore/lite'
// import { firebaseConfig } from '../config/firebaseConfig'

// const app = initializeApp(firebaseConfig);

import { useFirebaseApp } from "reactfire";
import 'firebase/auth'
// import 'firebase/firebase-firestore-lite'

const firebase = useFirebaseApp()


const auth = null;
const currentUser = auth.currentUser;
const db = getFirestore(app);

const registeredWithEmailAndPassword = (payload) => {
    try {
        firebase.auth()
        .createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then(res => {
            const user = res.user;
            const userCol = collection(db, 'users');
            const userDoc = doc(userCol, user.uid);

            setDoc(userDoc,{
                uid: user.uid,
                name: payload.name,
                authProvider: "local",
                email: payload.email,
            })
        })
        .catch(error => {
            console.error(error, 'error')
        })
    }
    catch(err){
        console.error(err, 'err')
    }
}

const signWithEmailAndPassword = (payload) => {
    try {
        firebase.auth().signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then(data => {
            const userRef = doc(db, "users", data.user.uid)
            
            const userDoc = getDoc(userRef)
                .then(result => {
                    console.log('getDoc', result.data())
                })
                .catch(error =>  {
                    console.log('get err', error)
                })

            return data;
        })
        .catch(error => {
            console.error(error, 'error')
            return error
        });
    } catch (error) {
        console.error(error, 'err')
    }
}

const signingOut = () => {
    firebase.auth().signOut(auth);
}

// const deleteThisUser = (payload) => {
//     deleteUser(payload.user)
//         .then(result => {
//             console.log('result', result)
//         })
//         .catch(error => {
//             console.log('error', error)
//         })
// }

const firebaseAuth = {
    signWithEmailAndPassword,
    registeredWithEmailAndPassword,
    signingOut,
    auth,
    currentUser
}

export 
{
    firebaseAuth
};