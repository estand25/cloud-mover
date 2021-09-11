import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '.'

const SnackBarHolder  = ({classes, alert, onHandleClose}) => {
    return (
        <div className={classes.snackbar}>
            <Snackbar open={alert?.open} autoHideDuration={6000} onClose={onHandleClose}>
                <Alert onClose={onHandleClose} severity={alert?.severity}>
                    {alert?.text}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default SnackBarHolder