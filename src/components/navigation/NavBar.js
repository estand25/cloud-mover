import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import { NavBarAvatar, NavBarLogo } from '.';
import { useHistory } from "react-router-dom"

import {
  useStyles
} from '../../styles'

//https://material-ui.com/components/app-bar/
const NavBar = () => {
  const history = useHistory()
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const home = () => history.push('/')

  const BadgeIconNumber = (props) => {
    return (
      <IconButton aria-label="show number new mails" color="inherit">
        <Badge badgeContent={props?.count ?? 0} color="secondary">
          {props.children}
        </Badge>
      </IconButton>
    )
  }

  const MainNavBar = ({classes, mailCount, notificationCount}) => {
    return (
      <div className={classes.sectionDesktop}>
        <BadgeIconNumber
          count={mailCount}
        >
          <MailIcon />
        </BadgeIconNumber>
        <BadgeIconNumber
          count={notificationCount}
        >
          <NotificationsIcon />
        </BadgeIconNumber>
        <NavBarAvatar/>
      </div>
    )
  }

  const MainNavLogoSection = ({classes, onHome}) => {
    return (
      <div>
          <NavBarLogo 
            onHome={onHome}
          />
          <Typography className={classes.title} variant="h6" noWrap>
            Cloud-Mover
          </Typography>      
      </div>
    )
  }

  const MainNavMobile = ({classes, onMobileMenuId, onHandleMobileMenuOpen}) => {
    return (
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls={onMobileMenuId}
          aria-haspopup="true"
          onClick={onHandleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
          <NavBarAvatar/>
        </IconButton>
      </div>
    )
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <MainNavLogoSection
            classes={classes}
            onHome={home}
          />
          <div className={classes.grow} />  
          <MainNavBar
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
