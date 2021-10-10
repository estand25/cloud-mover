import React from 'react'

import Button from '@material-ui/core/Button';
import FieldText from '../general/FieldText';
import FieldTextReadOnly from '../general/FieldTextReadOnly';

const AccountInfo = ({classes, value, onChangeState, onChangeAccount, onDeleteAccount, isLoading}) => {
    return (
        <form className={classes.root} autoComplete="off">
            <div>
                <FieldText
                    value={value?.name}
                    onChangeState={onChangeState}
                    name="name"
                    label="Name"
                    isLoading={isLoading}
                />
            </div>
            <div>
                <FieldText
                    value={value?.authProvider}
                    onChangeState={onChangeState}
                    name="authProvider"
                    label="Auth Provider"
                    isLoading={isLoading}
                />
            </div>
            <div>
                <FieldTextReadOnly
                    value={value?.uid}
                    name="uid"
                    label="Unique Id"
                    isLoading={isLoading}
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