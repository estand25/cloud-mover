import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import { NavBarAvatar} from '.';

const MainNavMobile = ({classes, onMobileMenuId, onHandleMobileMenuOpen}) => {
    return (
        <div className={classes.sectionMobile}>
            <IconButton
                id="nav-bar-mobile-btn"
                data-testid="nav-bar-mobile-btn"
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

export default MainNavMobile