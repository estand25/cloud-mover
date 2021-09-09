import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import CloudIcon from '@material-ui/icons/Cloud';

import { useHistory } from "react-router-dom"

const NavBarLogo = () => {
    const history = useHistory()
    const home = () => history.push('/')

    return (
        <IconButton
          edge="start"
          color="inherit"
          onClick={home}
        >
          <CloudIcon style={{ fontSize: 40 }}/>
        </IconButton>
      )
}

export default NavBarLogo