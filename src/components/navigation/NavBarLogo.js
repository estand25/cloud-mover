import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import CloudIcon from '@material-ui/icons/Cloud';

const NavBarLogo = ({onHome}) => {
    return (
        <IconButton
          id="nav-icon-btn"
          data-testid="nav-icon-btn"
          name='home'
          edge="start"
          color="inherit"
          onClick={onHome}
        >
          <CloudIcon style={{ fontSize: 40 }}/>
        </IconButton>
      )
}

export default NavBarLogo