import React from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const AccountInfo = ({classes, value, onChangeState, onChangeAccount, onDeleteAccount}) => {
    return (
        <form className={classes.root}>
            <div>
                <TextField
                    id="outline"
                    label="Name"
                    value={value.name}
                    variant="outlined"
                    onChange={(e) => onChangeState(e.target.value,'name')}
                />
            </div>
            <div>
                <TextField
                    id="outline"
                    label="Auth Provider"
                    value={value.authProvider}
                    variant="outlined"
                    onChange={(e) => onChangeState(e.target.value,'authProvider')}
                />
            </div>
            <div>
                <TextField
                    inputProps={{
                        readOnly: true,
                        disabled: true,
                    }}
                    id="outline"
                    label="Unique Id"
                    value={value.uid}
                    variant="outlined"
                />
            </div>
            <div>
                <Button 
                    variant="outlined" 
                    onClick={onChangeAccount}
                >
                    Update Account
                </Button>
            </div>
            <div>
                <Button 
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