import React from 'react'
import Button from '@material-ui/core/Button';
import { AccountIcon } from '.';

const DeleteAccountButton = () => {
    return (
        <Button 
            variant="outlined" 
            color="secondary" 
            // onClick={deleteAccount}
            startIcon={
                <AccountIcon />
            }
        >
            Delete account
        </Button>
    )
}

export default DeleteAccountButton