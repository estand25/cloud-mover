import React from "react"
import { Fab } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';

import clsx from 'clsx';

const UploadPhotoButton = ({classes, onChange}) => {
    return (
        <FormControl className={clsx(classes.marginPhoto, classes.textFieldPhoto)} variant="outlined">
            <label htmlFor="upload-photo">
                <OutlinedInput
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="upload-photo"
                    variant="outlined"
                    type="file"
                    onChange={onChange}
                />
                <Fab
                    color="primary"
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended"
                >
                    <AddIcon /> Upload photo
                </Fab>
            </label>
        </FormControl>
    )
}

export default UploadPhotoButton