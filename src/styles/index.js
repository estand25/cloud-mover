import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        },
        '& .MuiButton-root': {
          margin: theme.spacing(1),
          width: '25ch',
        }
      },
    SubGrid:{
        '& .MuiGrid-root':{
            margin: "25px"
        }
    },
    card: {
        maxWidth: 345,  
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    post: {
        minWidth: 300,
        justifyContent:"center",
        alignItems:"center"
    },
    media: {
        height: 200,
        borderRadius: '50%',
        alignItems:"center"
    },
    header: {
        textAlign: 'center'
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '25ch',
    },
    snackbar: {
        width: '100%',
        '& > * + *': {
        marginTop: theme.spacing(2),
        },
    },   
    marginPhoto: {
        margin: theme.spacing(1),
        alignItems: 'center'
    },
    textFieldPhoto: {
        width: '25ch',
        alignItems: 'center'
    },
    paper: {
        padding:  theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
}))

export {
    useStyles
}