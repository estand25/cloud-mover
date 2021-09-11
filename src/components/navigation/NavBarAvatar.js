import React, { useState} from 'react'
import { useSigninCheck } from 'reactfire';

import IconButton from '@material-ui/core/IconButton';
import MuiMenu from './MuiMenu'
import MuiMenuItem from './MuiMenuItem'
import { AccountIcon } from '../account';

import { useHistory } from "react-router-dom"

const NavBarAvatar = () => {
    const history = useHistory()  
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const {data: signInCheckResult} = useSigninCheck();

    const onMenuHandler = (rte) => {
      history.push(rte)
      handleClose()
    }

    const MenuOptionGeneration = ({list}) => {
      return list.map(item => {
        return <MuiMenuItem key={item.label} onClick={item.onClickHandle}>{item.label}</MuiMenuItem>
      });
    }

    const layout = !signInCheckResult || !signInCheckResult.signedIn ? 
    {
      method: handleClick,
      menuOptions: [
        {onClickHandle: () => onMenuHandler('/logIn'), label: 'Log-In'},
        {onClickHandle: () => onMenuHandler('/signUp'), label: 'Sign-Up'}
      ]
    }
    :
    {
      method: handleClick,
      menuOptions: [
        {onClickHandle: () => onMenuHandler('/profile'), label: 'Profile' },
        {onClickHandle: () => onMenuHandler('/myAccount'), label: 'My Account'},
        {onClickHandle: () => onMenuHandler('/logOut'), label: 'Log-Out'},
      ]
    }

    return (
      <div>
        <IconButton
          edge="end"
          color="inherit"
          onClick={layout.method}
        >
          <AccountIcon/>
        </IconButton>      
        <MuiMenu
          id="mini-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuOptionGeneration
            list={layout.menuOptions}
          />
        </MuiMenu>
      </div>
    )
}

export default NavBarAvatar;