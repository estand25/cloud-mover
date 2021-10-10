import React, { useEffect, useState} from 'react'
import { useUser } from 'reactfire';

import IconButton from '@material-ui/core/IconButton';
import MuiMenu from './MuiMenu'
import MuiMenuItem from './MuiMenuItem'
import { AccountIcon } from '../account';

import { useHistory } from "react-router-dom"

const NavBarAvatar = () => {
    const history = useHistory()  
    const user = useUser()
    const [anchorEl, setAnchorEl] = useState(null);
    const [IsSignIn, setIsSignIn] = useState(false)
  
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    useEffect(() => {
      if(user.data != null)
        setIsSignIn(user)
    },[user.data])
    
    const onMenuHandler = (rte) => {
      history.push(rte)
      handleClose()
    }

    const MenuOptionGeneration = ({list}) => {
      return list.map(item => {
        var id = item.label;
        if(id.includes('-')){
          id = id.toLowerCase();
        } else {
          id = id.replace(' ', '-').toLowerCase();
        }
        return <MuiMenuItem id={id} key={item.label} onClick={item.onClickHandle}>{item.label}</MuiMenuItem>
      });
    }

    const layout = !IsSignIn ? 
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
          id="iconBtn"
          edge="end"
          color="inherit"
          onClick={layout.method}
        >
          <AccountIcon
            id="accountIcon"
            IsSignIn={IsSignIn}
            user={IsSignIn ? user?.data : {}}
          />
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