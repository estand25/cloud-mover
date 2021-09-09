import React, { useState} from 'react'
import { useSigninCheck } from 'reactfire';

import IconButton from '@material-ui/core/IconButton';
import { AccountIcon } from '../account';

import { useHistory } from "react-router-dom"

const NavBarAvatar = () => {
    const history = useHistory()  
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const {data: signInCheckResult} = useSigninCheck();
    const logIn = () => history.push('/logIn')
    const profile = () => history.push('/profile')
    const logOut = () => history.push('/logOut')
    const MyAccount = () => history.push('/myAccount')

    return (
      <div>
        <IconButton
          edge="end"
          color="inherit"
          onClick={typeof(signInCheckResult?.user) !== 'undefined' ? profile: logIn}
        >
          <AccountIcon/>
        </IconButton>      
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {/* {typeof(signInCheckResult?.user) !== 'undefined' ? */}
          <MenuItem onClick={profile}>Profile</MenuItem>
          <MenuItem onClick={MyAccount}>My account</MenuItem>
          <MenuItem onClick={logOut}>Logout</MenuItem>
          {/* // :
          // } */}
        </Menu>
      </div>
    )
}

export default NavBarAvatar;