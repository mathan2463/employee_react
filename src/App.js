import './App.css';
import Loginform from './component/login';
import Signupform from './component/signup';
import { Route,Routes } from 'react-router';
import Employelist from './component/employelist';
import Employecreate from './component/createemploye';
import Employeedit from './component/editemploye';
function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
  const token = localStorage.getItem("accessToken");
  if (!token) {
    // return <Loginform />;
    return (
      <div>
      <Routes>
       <Route path='/' element={<Loginform/>}></Route>
       <Route path='/signup' element={<Signupform/>}></Route>
      </Routes>
      </div>
     );
  }else{
    return (
      <div>
      <Routes>
       <Route path='/' element={<Loginform/>}></Route>
       <Route path='/employelist' element={<Employelist/>}></Route>
       <Route path='/crateemploye' element={<Employecreate/>}></Route>
       <Route path='/editemploye/:id' element={<Employeedit/>}></Route>
       <Route path='/signup' element={<Signupform/>}></Route>
      </Routes>
      </div>
     );
  }
}

export default App;
