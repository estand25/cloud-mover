import React, {useState} from 'react'

import { useAuth, useFirestore } from "reactfire";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useHistory } from 'react-router-dom'

const LogInUser = () => {
    const auth = useAuth()
    const firestore = useFirestore()
    const history = useHistory()
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logIn = () => {
        try {
            signInWithEmailAndPassword(auth, email, password)
            .then(data => {
                const userRef = doc(firestore, 'users', data.user.uid)

                getDoc(userRef)
                    .then(result => {
                        console.log('getDoc', result.data())
                    })
                    .catch(error =>  {
                        console.log('get err', error)
                    })

                history.push('/profile')
            })
            .catch(error => {
                console.error(error, 'error')
                // return error
            });
        } catch (error) {
            console.error(error, 'err')
        }
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    onClick={logIn}
                >
                    Log-In
                </button>
            </div>
        </div>
    )
}

export default LogInUser;