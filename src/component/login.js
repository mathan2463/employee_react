import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
   root: {
      height: "100vh",
   },
   image: {
      backgroundImage: "url('/bck.png')",
      backgroundSize: "cover",
   },
   paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: "100%",
      marginTop: theme.spacing(1),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));


export default function Signin() {

   const classes = useStyles();
   const [username, setUserName] = useState();
   const [password, setPassword] = useState();
  

   useEffect(()=>{
      sessionStorage.clear();
  },[]);

  const handleSubmit = (e) => {
      e.preventDefault();
      if (validate()) {
          ///implentation
          // console.log('proceed');
          fetch("http://localhost:8000/employee/" + username).then((res) => {
              return res.json();
          }).then((resp) => {
              console.log(Object.keys(resp).length)
              if (Object.keys(resp).length === 0) {
                  swal("Failed", "Please Enter valid username", "error");
              } else {
               // console.log(resp.password +"==="+ password);
                  if (resp.password === password) {
                      swal("Success", "Logged in successfully", "success");
                     localStorage.setItem("accessToken", resp.type);
                     localStorage.setItem("user", JSON.stringify(resp));
                     window.location.href = "/employelist";
                  }else{
                      swal("Failed", "Please Enter valid credentials", "error");
                  }
              }
          }).catch((err) => {
              swal("Failed", "Login Failed ", "error");
          });
      }
  }

  const validate = () => {
      let result = true;
      if (username === '' || username === null) {
          result = false;
          swal("Failed", "Please Enter Username", "error");
      }
      if (password === '' || password === null) {
          result = false;
          swal("Failed", "Please Enter Password", "error");
      }
      return result;
  }

   return (
      <Grid container className={classes.root}>
         <CssBaseline />
         <Grid item xs={false} md={7} className={classes.image} />
         <Grid item xs={12} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
               <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component="h1" variant="h5">
                  Sign in
               </Typography>
               <form className={classes.form} onSubmit={handleSubmit}>
                  <TextField
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="email"
                     name="email"
                     label="Email Address"
                     onChange={(e) => setUserName(e.target.value)}
                  />
                  <TextField
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="password"
                     name="password"
                     label="Password"
                     type="password"
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     color="primary"
                     className={classes.submit}
                  >
                     Sign In
                  </Button>
                  <Link to={'/signup'}><Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     color="primary"
                     className={classes.submit}
                  >
                     Register
                  </Button></Link>
               </form>
            </div>
         </Grid>
      </Grid>
   );
}