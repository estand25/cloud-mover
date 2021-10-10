import React, {useState, useEffect, useCallback} from 'react'
import { useFirestore, useUser, useStorage } from "reactfire";

import {
    profileUseEffect,
    postsUseEffect
} from '../utilies'

import {
    defaultProfile,
    defaultAlert
} from '../constant'

const useProfile = () => {
    const firestore = useFirestore();
    const user = useUser();
    const storage = useStorage();

    const [preview, setPreview] = useState('')
    const [profile, setProfile] = useState(defaultProfile)
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [reset, setReset] = useState(false)
    const [signInCheckResult, setSignInCheckResult] = useState(false)
    const [fileName, setFileName] = useState({})
    const [alert, setAlert] = useState(defaultAlert)

    const callBackWrapper = useCallback(() => {
        profileUseEffect(firestore, user, profile, setProfile, setPreview)
        postsUseEffect(firestore, user, setList)
        setSignInCheckResult((typeof user.data == "object"))
    }, [user.data])

    useEffect(() => {
        callBackWrapper()
        setIsLoading(false)
    }, [user.data, reset])

    return {isLoading, list, user, signInCheckResult, profile, setProfile, preview, setPreview, firestore, storage, setReset, reset, fileName, setFileName, alert, setAlert}
}

export default useProfile