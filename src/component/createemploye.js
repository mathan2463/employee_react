import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiurl from './apiurl';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import swal from "sweetalert";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
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
const Employecreate = () => {
  const classes = useStyles();
  // state are  used to store user input
  const [name, setname] = useState("")

  const [email, setemail] = useState("")

  const [type, settype] = useState()

  const [phone, setphone] = useState("")

  const [password, setpassword] = useState("")

  const [address, setaddress] = useState("")
  // function is used to post data to json server by axios
  // const Pushdata = async () => {

  //   const req = { name, type, email, phone, password, address }
  //   const response = await apiurl.post("/employee/create", req)

  //     .catch((e) => {
  //       console.log(e);
  //       swal("Failed", "Id already exists", "error");
  //     })



  // }

  // function is called on clicking create button  
  const Handlesubmit = async (e) => {
    e.preventDefault()
    // Pushdata();
    const req = { name, type, email, phone, password, address }
    const response = await apiurl.post("/employee/create", req)
      .catch((e) => {
        console.log(e);
        swal("Failed", "Id already exists", "error");
      })
    console.log(response);
    if(response.data.status === true){
      swal("Success", "Data saved successfully!", "success", {
        buttons: false,
        timer: 1000,
     }).then((value) => {
        window.location.href = "/employelist";
     });
    }else{
      swal("Failed", response.data.message, "error");
    }
    // setemail("");
    // setname("");
    // setphone("");
    // settype("");
    // setpassword("");
    // setaddress("");
    

  }

  return (
    <div>
      <div className='bg-blue-600 h-[100px] relative '>
        <h1 className='text-5xl bg-blue-600 text-center pt-3 cursor-default'>EMPLOYEE MANAGEMENT</h1>
        <Link to={'/employelist'}>
          <button className='bg-white hover:bg-red-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow absolute top-[20px] right-[5px]'>BACK</button>
        </Link>
      </div>
      <div className='border-8  m-2  h-screen'>
        <h2 className='text-4xl text-center pb-4 cursor-default'>CREATE EMPLOYEE</h2>
        <div className=' w-[500px] h-[500px] mx-auto shadow-2xl '>

          <div className="w-full max-w-xs mx-auto divCenter">
            <form className={classes.form} onSubmit={Handlesubmit}>
              {/* <label className="">NAME</label> */}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
              {/* <label className="">EMAIL</label> */}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              {/* <label className="">PASSWORD</label> */}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              {/* <label className="">PHONE</label> */}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phone"
                name="phone"
                label="Phone"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
              <label className="">ADDRESS</label>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="address"
                name="address"
                label="Address"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
              <label className="">TYPE</label>
              <br></br>
              <Select
                labelId="type-label"
                id="type"
                value={type}
                label="Type"
                onChange={(e) => { settype(e.target.value) }}
              >
                <MenuItem value={1}>Admin</MenuItem>
                <MenuItem value={2}>Senior Developer</MenuItem>
                <MenuItem value={3}>Manager</MenuItem>
                <MenuItem value={4}>Support Team</MenuItem>
              </Select>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                CREATE
              </Button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Employecreate;