import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { 
  MainNotificationBar, 
  MainNavLogoSection, 
  MainNavMobile 
} from '.';
import { useHistory } from "react-router-dom"

import {
  useStyles
} from '../../styles'

const NavBar = () => {
  const classes = useStyles();
  const history = useHistory();
  
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const home = () => history.push('/')

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <MainNavLogoSection
            classes={classes}
            onHome={home}
          />
          <div className={classes.grow} />  
          <MainNotificationBar
            classes={classes}
            mailCount={0}
            notificationCount={0}
          />
          <MainNavMobile
            classes={classes}
            onMobileMenuId={mobileMenuId}
            onHandleMobileMenuOpen={handleMobileMenuOpen}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar
