import React, {useEffect, useState} from 'react'

import { useAuth } from "reactfire";
import { signOut } from 'firebase/auth'

const LogOutUser = () => {
    const auth = useAuth()

    const onLogOut = () => {
        console.log('onLogOut', auth)
        signOut(auth)
    }

    return (
        <button onClick={onLogOut}>
            Log Out
        </button>
    )
}

export default LogOutUser