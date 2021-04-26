//import React from 'react';
//import Header from '../components/Header/header';

//const Layout = (props) => {
 //   return (
     //   <div>
            
       //     <div>
         //       {props.children}
          //  </div>
       // </div>
    //);
//;

//export default Layout;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {getAuthToken} from '../helpers/Authgetuser'
import { Cookies } from 'react-cookie';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Layout(props) {
  const classes = useStyles();
  
  let history = useHistory();
  const token = getAuthToken();
  console.log(token)

  const logout =()=>{
    try {
        let cookies = new Cookies();
        cookies.remove('user', { path: '/' })
        history.push('/')
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          {
            token ?
            (<Button color="inherit" onClick={logout}>Logout</Button>)
            :
            (<Button color="inherit">Login</Button>)
          }
          
        </Toolbar>
      </AppBar>
      <div>{props.children}</div>
    </div>
  );
}