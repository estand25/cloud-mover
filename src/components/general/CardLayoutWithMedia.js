import React from 'react'

import Box from "@material-ui/core/Box";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 345,  
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      },
    media: {
        height: 200,
        borderRadius: '50%',
    },
  }));
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
                    <CardMedia
                        className={classes.media}
                        image={props.image}
                        title={props.title}
                    />  
                {props.children}  
                </CardContent>  
            </Card>        
        </Box>
    )
}

export default CardLayoutWithMedia;