import React from "react"
import { Fab } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from "@material-ui/icons/Add";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
      alignItems: 'center'
    },
    textField: {
      width: '25ch',
      alignItems: 'center'
    }
  }));

const UploadPhotoButton = ({label, onChange, file, previewImageUrl}) => {
    const classes = useStyles();
    return (
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
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