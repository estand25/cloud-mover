import React from 'react'
import { NavBarAvatar, BadgeIconNumber } from '.';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

const MainNotificationBar = ({classes, mailCount, notificationCount}) => {
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

export default MainNotificationBar