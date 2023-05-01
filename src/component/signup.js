import React, { useState } from "react";
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

async function signup(params) {
   return fetch("http://localhost:3000/employee/create", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
   }).then((data) => data.json());
}

export default function Signup() {
   const classes = useStyles();
   const [name, setname] = useState();
   const [email, setemail] = useState();
   const [password, setpassword] = useState();
   const [phone, setphone] = useState();
   const [address, setaddress] = useState();
   const [type, settype] = useState();
   settype(1);
   const handleSubmit = async (e) => {
      settype(1);
      e.preventDefault();
      const response = await signup({
         name,email,password,phone,address,type
      });
      if (response.status === true) {
         swal("Success", response.message, "success", {
            buttons: false,
            timer: 2000,
         }).then((value) => {
            window.location.href = "/";
         });
      } else {
         swal("Failed", response.message, "error");
      }
   };

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
                  Register
               </Typography>
               <form className={classes.form} onSubmit={handleSubmit}>
                  <TextField
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="name"
                     name="name"
                     label="Name"
                     onChange={(e) => setname(e.target.value)}
                  />
                  <TextField
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="email"
                     name="email"
                     label="Email"
                     onChange={(e) => setemail(e.target.value)}
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
                     onChange={(e) => setpassword(e.target.value)}
                  />
                  <TextField
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="phone"
                     name="phone"
                     label="Phone"
                     onChange={(e) => setphone(e.target.value)}
                  />
                  <TextField
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="address"
                     name="address"
                     label="Address"
                     onChange={(e) => setaddress(e.target.value)}
                  />
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     color="primary"
                     className={classes.submit}
                  >
                     Register
                  </Button>
                  <Link to={'/'}><Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     color="primary"
                     className={classes.submit}
                  >
                     Sign In
                  </Button></Link>
               </form>
            </div>
         </Grid>
      </Grid>
   );
}