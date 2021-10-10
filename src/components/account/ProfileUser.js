import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { NoProfilePresent } from '.';
import { UploadPhotoButton } from '../general'

import FieldText from '../general/FieldText';
import FieldTextReadOnly from '../general/FieldTextReadOnly';

const ProfileUser = ({classes, signInCheckResult, value, onChangeState, onChangeImage, file, previewImageUrl, onSubmit, isLoading}) => {
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
                    <FieldText
                        value={value?.displayName}
                        onChangeState={onChangeState}
                        name="displayName"
                        label="Display"
                        isLoading={isLoading}
                    />
                </div>
                <div>
                    <FieldTextReadOnly
                        value={value?.email}
                        name="email"
                        label="Email"
                        isLoading={isLoading}
                    />
                </div>
                <div>
                    <TextField
                        id="outline-Bio"
                        data-testid="outline-Bio"
                        label="Bio"
                        name="bio"
                        multiline
                        rows={4}
                        value={value?.bio}
                        variant="outlined"
                        onChange={onChangeState}
                    />
                </div>
                <div>
                <TextField
                    id="outline-DOB"
                    data-testid="outline-DOB"
                    name='dob'
                    label="Birthday"
                    type="date"
                    value={value?.dob}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={onChangeState}
                />
                </div>
                <div>
                    <Button 
                        id="updateProfileBtn"
                        variant="outlined" 
                        onClick={onSubmit}
                    >
                        Update Profile
                    </Button>
                </div>
            </form>
        )
    }
}

export default ProfileUser