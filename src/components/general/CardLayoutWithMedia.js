import React from 'react'

import Box from "@material-ui/core/Box";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import AccountCircle from '@material-ui/icons/AccountCircle';

import {
    useStyles
} from '../../styles'

const CardLayoutWithMedia = (props) => {
    const classes = useStyles();

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Card className={classes.card}>
                <CardContent>
                    <Typography style={{ textAlign: 'center' }} variant="h5" component="h2">
                        {props.header}
                    </Typography>  
                    {
                        props.image ?
                            <CardMedia
                                className={classes.media}
                                image={props.image}
                                title={props.title}
                            /> 
                            :
                            <AccountCircle
                                style={{ fontSize: 200 }}
                            />
                    } 
                {props.children}  
                </CardContent>  
            </Card>        
        </Box>
    )
}

export default CardLayoutWithMedia;