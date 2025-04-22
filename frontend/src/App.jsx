/* eslint-disable no-unused-vars */
import React from 'react';
import Login from './screens/Login/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/authContext';
import Home from './screens/Home/Home';
import ResponseForm from './screens/Form/ResponseForm';
import Signup from './screens/Signup/Signup'



const App = () => {
  // const verifyLogin=(details)=>{
  //   console.log(details);
  //   /*
  //      use axios to fetch result from database

  //       use post method in body send the details that has email password 
  //       send the result accordingly
        
    
  //   */

  // }
  const {authUser} = useAuthContext();
  return (
    <div>
    <Routes>
      <Route path='/' element={authUser ? <Home /> : <Navigate to={"/signup"} />} />
      <Route path='/login' element={authUser ? <Navigate to="/" /> :<Login />} />
      <Route path='/response-form' element={<ResponseForm />} />
      <Route path='/signup' element={authUser ? <Navigate to="/" /> :<Signup />} />
      

    </Routes>
    <Toaster/>
   {/* <Login  verifyLogin={verifyLogin}/> */}
    </div>
  );
};

export default App;