import logo from './logo.svg';
import './App.css';
import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import Navbar from './Component/Navbar/Navbar';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Movies from './Component/Movies/Movies';
import Tv from './Component/Tv/Tv';
import Moviedetails from './Component/MovieDetails/Moviedetails';
import Tvdetails from './Component/TvDetails/Tvdetails';
import jwtDecode from 'jwt-decode'
import { useState, useEffect } from 'react';
import Card from './Component/Card/Card';



function App() {


  const navigate = useNavigate()
  const [loggedInUser, setloggedInUser] = useState(null)






  function getUserToken() {
    let userToken = localStorage.getItem('tkn')
    let userData = jwtDecode(userToken)
    setloggedInUser(userData)

  }

  function logut() {
    localStorage.removeItem('tkn')
    setloggedInUser(null)
    navigate("/login")
  }

  function checkUserIfLoggedIn() {  // عشان لما اعمل ريفرش ميطلعنيش بره
    if (localStorage.getItem('tkn') != null) {
      getUserToken()
    }
  }

  useEffect(function () {
    checkUserIfLoggedIn()
  }, [])


  function ProtectedRoute(props) {
    if (loggedInUser != null) {
      return <>
        {props.children}
      </>
    }
    else {
      return (
        // <Navigate to={"/login"}/>
        <Login message="Please Login first" dec={getUserToken} />
      )
    }
  }
  // prevent user from going to login page if he is already logged in
  function ProtectedLogin(props) { 
    if (loggedInUser != null) {
      return (
        <Navigate to={"/home"} />
      )
    }
    else {
      return <>
        {props.children}
      </>
    }
  }
   
    // prevent user from going to reg page if he is already logged in
  function ProtectedRegister(props) {
    if (loggedInUser != null) {
      return <>
       <Navigate to={"/home"} />

      </>
       
    }
    else {
      return <>
        {props.children}
      </>
    }
  }



  return <>


    <Navbar crrUser={loggedInUser} logOut={logut} />


    <Routes>
      <Route path='home' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />

      <Route path='moviedetails' element={<ProtectedRoute> <Moviedetails /> </ProtectedRoute>} >
        <Route path=':id' element={<ProtectedRoute> <Moviedetails /> </ProtectedRoute>} />
      </Route>

      <Route path='tvdetails' element={<ProtectedRoute> <Tvdetails /> </ProtectedRoute>} >
        <Route path=':id' element={<ProtectedRoute> <Tvdetails /> </ProtectedRoute>} />
      </Route>

      <Route path='movies' element={<ProtectedRoute> <Movies /> </ProtectedRoute>} />
      <Route path='tv' element={<ProtectedRoute> <Tv /></ProtectedRoute>} />
      <Route path='' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
      <Route path="Card" element={<ProtectedRoute> <Card currentUser={loggedInUser} /> </ProtectedRoute>} />


      <Route path='login' element={<ProtectedLogin> <Login dec={getUserToken} /> </ProtectedLogin>} />
      <Route path='register' element={<ProtectedRegister> <Register /> </ProtectedRegister>} />

      <Route path="*" element={<div className="vh-100 d-flex align-items-center justify-content-center "> <h1>4   0  4</h1>   </div>} />


    </Routes>

  </>
}

export default App;
