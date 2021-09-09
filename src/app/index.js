import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import {
    Profile
} from '../components/account'

import {
    FrontPage,
    LogIn,
    LogOut,
    SignUp
} from '../pages'

import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { 
    FirestoreProvider, 
    DatabaseProvider, 
    AuthProvider, 
    StorageProvider , 
    useFirebaseApp 
} from 'reactfire';

import {
    NavBar
} from '../components/section'

export const App = () =>  {
    const app = useFirebaseApp();
    
    const database = getDatabase(app);
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    const storage = getStorage(app)

    return (
        <AuthProvider sdk={auth}>
            <DatabaseProvider sdk={database}>
                <FirestoreProvider sdk={firestore}>
                    <StorageProvider sdk={storage}>
                        <Router>
                            <NavBar/>
                            <Switch>
                                <Route path="/" exact component={FrontPage} />
                                <Route path="/profile" exact component={Profile} />
                                <Route path="/signUp" exact component={SignUp} />
                                <Route path="/logIn" exact component={LogIn} />
                                <Route path="/logOut" exact component={LogOut} />
                            </Switch>
                        </Router>
                    </StorageProvider>
                </FirestoreProvider>
            </DatabaseProvider>
        </AuthProvider>
    )
}