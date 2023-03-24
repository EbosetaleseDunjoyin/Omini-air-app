import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import {  AppBar, Avatar, Button, Toolbar, Typography, } from "@material-ui/core";
import useStyles from "./styles";
import decode from 'jwt-decode'
import { LOGOUT } from "../../constants/actionTypes";

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const profile = JSON.parse(localStorage.getItem("profile"));
  const [user, setUser] = useState(profile);
 
 
 

  const logOut = () => {
    try {
      dispatch({ type: LOGOUT });

      history.push("/auth");
    } catch (error) {
      console.log(error);
    }
  };

   useEffect(() => {
     const token = user?.token;
     if (token) {
       const decodeToken = decode(token);
       if (decodeToken.exp * 1000 < new Date().getTime()) {
         logOut();
       }
     }

     setUser(JSON.parse(localStorage.getItem("profile")));
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Omini Air
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.firstName}
              src={user.result.imageUrl}
            >
              {user.result.firstName.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.firstName}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={() => logOut()}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

