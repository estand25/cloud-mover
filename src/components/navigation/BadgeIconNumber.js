import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

const BadgeIconNumber = (props) => {
    return (
        <IconButton aria-label="show number new mails" color="inherit">
            <Badge badgeContent={props?.count ?? 0} color="secondary">
                {props.children}
            </Badge>
        </IconButton>
    )
}

export default BadgeIconNumber;

