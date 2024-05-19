import joi from 'joi'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
export default function Login(props) {


  
  const navigate = useNavigate()  // بتعمل ريندر لكمبوننت تاني
  const [user , setUser] = useState({
    email: "",
    password: " "
  })

  const [   errorList , setEorrrList] = useState([])


  const [   apiError , setapiError] = useState([])

function getUser(e){

  let idOfChangeInput = e.target.id
  let inputValue =  e.target.value
  let newUser = {...user}
  newUser[idOfChangeInput] = inputValue;  // ده اوبجيكت بس دي طريقه اوصل لاي كي جواه 

  setUser(newUser)

}






async function submetMyForm(e){
  e.preventDefault()  // عشان ميعملش ريفرش ام ادوس علي الزرار

  const schema = joi.object({
    
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().pattern(/^[a-z0-9]{8,}$/i)
  })


  let resultValidate = schema.validate(user , {abortEarly : false}) 
  // abortEarly      بس input  عشان يجيلي كل الايرور مش ايرور اول 

  if(resultValidate.error == undefined){  // no error
      let {data} = await axios.post('https://route-movies-api.vercel.app/signin', user)
      let userToken = data.token ;
      localStorage.setItem('tkn' , userToken)  // عشان اسيف الداتا بتاعت اليوزر
      props.dec()

      if(data.message == "success"){
        navigate( "/home" )
      }

      else{
      setapiError(data.message)
      }
  }


  else{
    let ErrorList = resultValidate.error.details
    setEorrrList(ErrorList)
  }
  




}


  return <>

  <div className="w-75 m-auto">
    <h2 className='mb-3'>logi form </h2>
    {props.message ? <div className='alert alert-danger'>{props.message}</div> :""}
    {apiError.length == 0 ? "" :  <div className='alert alert-danger'> {apiError} </div> }
    
    {errorList.length == 0 ? "" : errorList.map( (err)=>  <div className='alert alert-danger'> {err.message}</div> )}

    <form onSubmit={submetMyForm} >
    
      <label htmlFor="email">email</label>
      <input  onChange={getUser} autoComplete="username" type="text" id='email' placeholder='email' className='form-control mb-4' />

      <label htmlFor="password">password</label>
      <input  onChange={getUser} autoComplete="current-password" type="password" id='password' placeholder='password' className='form-control mb-4' />


      <button  className='btn btn-outline-info'> Login..</button>

      
    </form>
  </div>
  </>
}
