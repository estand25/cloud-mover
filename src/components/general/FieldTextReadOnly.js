import React from 'react'

import TextField from '@material-ui/core/TextField';
import Skeleton from '@material-ui/lab/Skeleton'

const FieldTextReadOnly = ({value, name, label, isLoading}) => {
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
                        inputProps={{
                            readOnly: true,
                            disabled: true,
                        }}
                        name={name}
                        label={label}
                        value={value}
                        variant="outlined"
                    />
            }
        </React.Fragment>
    )
}

export default FieldTextReadOnly