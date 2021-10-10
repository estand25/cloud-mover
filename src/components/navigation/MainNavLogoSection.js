import React from 'react'
import { NavBarLogo } from '.';
import Typography from '@material-ui/core/Typography';

const MainNavLogoSection = ({classes, onHome}) => {
    return (
        <div className={classes.sectionLowgo}>
            <NavBarLogo 
                onHome={onHome}
            />
            <Typography className={classes.title} variant="h6" noWrap>
                {"Cloud-Mover"}
            </Typography>      
        </div>
    )
}

export default MainNavLogoSection