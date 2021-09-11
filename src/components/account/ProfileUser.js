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
                        classes={classes}
                        onChange={onChangeImage}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-Display"
                        label="Display"
                        name="displayName"
                        value={value.displayName}
                        variant="outlined"
                        onChange={onChangeState}
                        required
                        error={!value.displayName}
                        helperText={!value.displayName ? "Display name is required" : ""}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-Email"
                        label="Email"
                        name="email"
                        inputProps={{
                            readOnly: true,
                            disabled: true,
                        }}
                        value={value.email}
                        variant="outlined"
                        onChange={onChangeState}
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