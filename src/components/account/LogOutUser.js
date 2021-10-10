import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';

const LogOutUser = ({classes, onLogOut}) => {
    return (
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <Button 
                id="logOutBtn"
                onClick={onLogOut}
                variant="outlined"
            >
                Log Out
            </Button>
        </FormControl>
    )
}

export default LogOutUser