import React from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const AccountInfo = ({classes, value, onChangeState, onChangeAccount, onDeleteAccount}) => {
    return (
        <form className={classes.root} autoComplete="off">
            <div>
                <TextField
                    id="outline-name"
                    required
                    name="name"
                    label="Name"
                    value={value.name}
                    variant="outlined"
                    onChange={onChangeState}
                    error={!value.name}
                    helperText={!value.name ? "Name is required" : ""}
                />
            </div>
            <div>
                <TextField
                    id="outline-authProvider"
                    required
                    name="authProvider"
                    label="Auth Provider"
                    value={value.authProvider}
                    variant="outlined"
                    onChange={onChangeState}
                    error={!value.authProvider}
                    helperText={!value.authProvider ? "Auth Provider is required" : ""}
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
                    id="outlined-change-account" 
                    variant="outlined" 
                    onClick={onChangeAccount}
                >
                    Update Account
                </Button>
            </div>
            <div>
                <Button 
                    id="outlined-delete-account"
                    variant="outlined" 
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