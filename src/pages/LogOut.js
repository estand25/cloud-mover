import { LogOutUser } from "../components/account";

import { useAuth } from "reactfire";
import { signOut } from 'firebase/auth'

const LogOut = () => {
    const auth = useAuth()
    const onLogOut = () => signOut(auth)

    return (
        <LogOutUser
            onLogOut={onLogOut}
        />
    )
}

export default LogOut