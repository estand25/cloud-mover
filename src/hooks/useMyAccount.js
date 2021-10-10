import { useState, useEffect, useCallback } from "react"
import { useFirestore, useUser, useStorage, useAuth } from "reactfire"

import {
    accountUseEffect
} from '../utilies'

import {
    defaultMyAccount
} from '../constant'

const useMyAccount = () => {
    const firestore = useFirestore();
    const user = useUser()
    const storage = useStorage();
    const auth = useAuth();

    const [account, setAccount] = useState(defaultMyAccount)
    const [isLoading, setIsLoading] = useState(true)

    const callBackWrapper = useCallback(() => {
        accountUseEffect(firestore, user, account, setAccount, setIsLoading)
    }, [user.data])

    useEffect(() => {
        callBackWrapper()
    }, [user.data])

    return {isLoading, account, setAccount, firestore, storage, auth}
}

export default useMyAccount