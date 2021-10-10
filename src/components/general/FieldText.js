import React from 'react'

import TextField from '@material-ui/core/TextField';
import Skeleton from '@material-ui/lab/Skeleton'

const FieldText = ({value, onChangeState, name, label, isLoading}) => {
    return (
        <React.Fragment>
            {
                isLoading ? 
                    <Skeleton
                        data-testid={"outline-" + name}
                        animation="wave"
                        style={{padding: "25px"}}
                    />
                :
                    <TextField
                        id={"outline-" + name}
                        data-testid={"outline-" + name}
                        required
                        name={name}
                        label={label}
                        value={value}
                        variant="outlined"
                        onChange={onChangeState}
                        error={!value}
                        helperText={!value ? label + " is required" : ""}
                    />
            }
        </React.Fragment>
    )
}

export default FieldText