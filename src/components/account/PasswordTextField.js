import React from 'react'

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import clsx from 'clsx';

const PasswordTextField = ({classes, label, value, showPassword, onChange, onChangeShowPassword, onChangeMouseShowPassword}) => {
    return (
        <FormControl 
            className={clsx(classes.margin, classes.textField)} 
            variant="outlined"
            required
            error={!value}
        >
            <InputLabel 
                htmlFor="outlined-password"
                required
                error={!value}
            >
                {label}
            </InputLabel>
            <OutlinedInput
                id="outlined-password"
                data-testid="outlined-password"
                type={showPassword ? 'text' : 'password'}
                value={value}
                name="password"
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                        id="password-eye-icon"
                        aria-label="toggle password visibility"
                        onClick={onChangeShowPassword}
                        onMouseDown={onChangeMouseShowPassword}
                        edge="end"
                    >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                    </InputAdornment>
                }
                labelWidth={70}
                required
                error={!value}
            />
        </FormControl>
    )
}

export default PasswordTextField;