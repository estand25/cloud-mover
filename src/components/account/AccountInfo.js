import React from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const AccountInfo = ({classes, value, onChangeState, onChangeAccount, onDeleteAccount}) => {
    return (
        <form className={classes.root}>
            <div>
                <TextField
                    id="outline-name"
                    name="name"
                    label="Name"
                    value={value.name}
                    variant="outlined"
                    onChange={onChangeState}
                />
            </div>
            <div>
                <TextField
                    id="outline-authProvider"
                    name="authProvider"
                    label="Auth Provider"
                    value={value.authProvider}
                    variant="outlined"
                    onChange={onChangeState}
                />
            </div>
            <div>
                <TextField
                    inputProps={{
                        readOnly: true,
                        disabled: true,
                    }}
                    id="outline-uid"
                    label="Unique Id"
                    value={value.uid}
                    variant="outlined"
                />
            </div>
            <div>
                <Button 
                    variant="outlined-change-account" 
                    onClick={onChangeAccount}
                >
                    Update Account
                </Button>
            </div>
            <div>
                <Button 
                    variant="outlined-delete-account" 
                    color="secondary"
                    onClick={onDeleteAccount}
                >
                    Delete Account
                </Button>
            </div>
        </form>
    )

}

export default AccountInfo