import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { NoProfilePresent } from '.';
import { UploadPhotoButton } from '../general'

const ProfileUser = ({classes, signInCheckResult, value, onChangeState, onChangeImage, file, previewImageUrl, onSubmit}) => {
    if(!signInCheckResult){
        return <NoProfilePresent/>
    }
    else
    {
        return (
            <form className={classes.root}>
                <div>
                    <UploadPhotoButton
                        onChange={onChangeImage}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-Display"
                        label="Display"
                        value={value.displayName}
                        variant="outlined"
                        onChange={(e) => onChangeState(e.target.value,'displayName')}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-Email"
                        label="Email"
                        value={value.email}
                        variant="outlined"
                        onChange={(e) => onChangeState(e.target.value,'email')}
                    />
                </div>
                <div>
                    <Button variant="outlined" onClick={onSubmit}>
                        Update Profile
                    </Button>
                </div>
            </form>
        )
    }
}

export default ProfileUser