import React, {useState} from 'react'

import Box from "@material-ui/core/Box";
import {Card, CardHeader ,CardContent, CardActionArea} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import ReplyIcon from '@material-ui/icons/Reply';

import {
    useStyles
} from '../../styles'

import {
    onFavoriteChange
} from '../../utilies'

const PostItem = (props) => {
    const {id, title, favorite, alert, setAlert, firestore, setEdit} = props
    const classes = useStyles();
    const [favorite_, setFavorite] = useState(favorite)

    const onFavoriteClick = () => {
        onFavoriteChange(firestore, id, !favorite_, alert, setAlert)
        setFavorite(!favorite_)
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minWidth="550"
        >
            <Card className={classes.post}>
                 <CardHeader
                     title={title}
                 /> 
                <CardActionArea>
                    <CardContent>   
                        {props.children}  
                    </CardContent>  
                </CardActionArea>
                <IconButton 
                    aria-label="edit post"
                    onClick={() => setEdit(true)}
                >
                    <EditIcon/>
                </IconButton>   
                <IconButton 
                    aria-label="add to favorites" 
                    onClick={() => onFavoriteClick()}>
                    <FavoriteIcon 
                        color= {!favorite_ ? "action" : "secondary"}
                    />
                </IconButton>
                <IconButton>
                    <ReplyIcon/>
                </IconButton>
            </Card>        
        </Box>
    )
}

export default PostItem;
