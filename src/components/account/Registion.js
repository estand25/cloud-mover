import React, { useState} from 'react'

import { useAuth, useFirestore } from "reactfire";
import { doc, setDoc} from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const Registion = () => {
    const auth = useAuth()
    const firestore = useFirestore()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")

    const registion = () => {
        try {
            console.log('registion', auth)
            createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                const user = res.user;
                const userDoc = doc(firestore, 'users', user.uid);
    
                setDoc(userDoc,{
                    uid: user.uid,
                    name: name,
                    authProvider: "local",
                    email: email,
                    password: password
                })
                
                history.push('/profile')
            })
            .catch(error => {
                console.error(error, 'error')
            })
        }
        catch(err){
            console.error(err, 'err')
        }
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                />
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
                    onClick={registion}
                >
                    Register
                </button>
            </div>
        </div>
    )
}

export default Registion;