import React from 'react'
import { Link } from 'react-router-dom';
import $ from 'jquery';
export default function Navbar(props) {
  $('.nav-link').click(function(){
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
  });

  return <>
  <div>
        
        <nav className ="navbar navbar-expand-lg navbar-dark ">
  <div className ="container-fluid">
    <Link className ="navbar-brand" to={"home"} >NOXE</Link>
    <button className ="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className ="navbar-toggler-icon"></span>
    </button>
    <div className ="collapse navbar-collapse" id="navbarSupportedContent">

      
    {props.crrUser ?<ul className ="navbar-nav me-auto mb-2 mb-lg-0">
          <li className ="nav-item">
            <Link className ="nav-link active" aria-current="page" to={'home'} >Home</Link>
          </li>

          <li className ="nav-item">
            <Link className ="nav-link" aria-current="page" to={'movies'} >movies</Link>
          </li>

          <li className ="nav-item">
            <Link className ="nav-link" aria-current="page" to={'tv'} >tv show</Link>
          </li>
        </ul> : ""}
   
      <ul  className ="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
        <li className ="nav-item">
       
          <i className='fa-brands me-3 fa-facebook  '>  </i>
          <i className='fa-brands me-3 fa-twitter'>  </i>
          <i className='fa-brands me-3 fa-spotify'>  </i>
          <i className='fa-brands me-3 fa-instagram'>  </i>
           <Link className='userinfo' to = {'card'} > <i className="fa-regular me-3  fa-user"></i> </Link>
        </li>


        {props.crrUser ? <li className ="nav-item">
          <span className ="nav-link Logout" onClick={ props.logOut }>Logout</span>
        </li> :  <>
        <li className ="nav-item">
          <Link className ="nav-link" to={"login"}>Login</Link>
        </li>
        <li className ="nav-item">
          <Link className ="nav-link" to={"register"}>Register</Link>
        </li>
        </>}



      </ul>

    </div>
  </div>
</nav>


    </div>
  </>
}
