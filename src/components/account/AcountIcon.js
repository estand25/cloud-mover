import React from 'react'
import { useSigninCheck } from "reactfire";
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';

const AccountIcon = () => {
    const {data: signInCheckResult} = useSigninCheck();
    
    if(!signInCheckResult || !signInCheckResult.signedIn){
        return <AccountCircle style={{ fontSize: 40 }}/>
    }
    else
    {
        return <Avatar alt={signInCheckResult?.user?.displayName} src={signInCheckResult?.user?.photoURL} />
    }
}

export default AccountIcon