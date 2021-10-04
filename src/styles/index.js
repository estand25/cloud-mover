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
    grow: {
    flexGrow: 1,
    },
        menuButton: {
    marginRight: theme.spacing(2),
    },
    title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
        display: 'block',
    },
    },
    inputRoot: {
    color: 'inherit',
    },
        inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
        sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
        sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}))

export {
    useStyles
}