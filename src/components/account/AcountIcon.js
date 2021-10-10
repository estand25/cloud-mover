import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';

const AccountIcon = ({IsSignIn, user}) => {
    if(!IsSignIn){
        return (
            <AccountCircle 
                id="accountCircleId"
                style={{ fontSize: 40 }}
            />
        )
    }
    else
    {
        return (
            <Avatar 
                id="avatarId"
                alt={user?.displayName} 
                src={user?.photoURL} 
            />
        )
    }
}

export default AccountIcon