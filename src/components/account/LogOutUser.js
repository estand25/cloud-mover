import React from 'react'
import Button from '@material-ui/core/Button';

const LogOutUser = ({onLogOut}) => {
    return (
        <Button 
            onClick={onLogOut}
            variant="outlined"
        >
            Log Out
        </Button>
    )
}

export default LogOutUser