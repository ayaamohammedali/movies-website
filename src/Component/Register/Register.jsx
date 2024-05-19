import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import joi, { date } from 'joi'

export default function Register() {


const navigate = useNavigate()  // بتعمل ريندر لكمبوننت تاني

const [user , setUser] = useState({
  first_name : "",
  last_name: "",
  age: "",
  email: "",
  password: " "
})

const [   errorList , setEorrrList] = useState(null)

const [   apiError , setApiError] = useState(null)




function getUser(e){
  setApiError(null)
  setEorrrList(null)
  let idOfChangeInput = e.target.id
  let inputValue =  e.target.value
  let neUser = {...user}
  neUser[idOfChangeInput] = inputValue
  setUser(neUser)
  
}

async function submetMyForm(e){
  e.preventDefault()   // عشان ميعملش ريفرش ام ادوس علي الزرار

const schema = joi.object({
  
  first_name : joi.string().min(3).max(8).required().alphanum() ,
  last_name: joi.string().min(3).max(8).required().alphanum() ,
  age: joi.number().min(18).max(80).required(),
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: joi.string().pattern(/^[a-z0-9]{8,}$/i)
})



let resultValidate = schema.validate(user , {abortEarly : false}) 
  // abortEarly      بس input  عشان يجيلي كل الايرور مش ايرور اول 


if(resultValidate.error == undefined){

  let {data} = await axios.post('https://route-movies-api.vercel.app/signup', user)

  if(data.message == "success"){
    navigate("/login")
  }
  else{
    setApiError(data.message)
  }

}
else{
  let ErrorList = resultValidate.error.details
  console.log(ErrorList);
  setEorrrList(ErrorList)
}





}

function GetspecifiedError(key){  //  input بتشوف الايرور بتاع كل 
  if (errorList != null){
    for (let i = 0; i < errorList.length; i++) {
      if (key == errorList[i].context.key ){
        return errorList[i].message
      } 
      
    }
    return ''
 

  }
}











return     <>

  <div className="w-75 m-auto">
    <h2 className='mb-3'>Registeration form </h2>

    { apiError ? <div className='alert alert-danger'> {apiError} </div> : ''}    

    <form onSubmit={submetMyForm} >
      <label htmlFor="first_name">first_name</label>
      <input onChange={getUser} autoComplete="username" type="text" id='first_name' placeholder='first_name' className='form-control mb-4' />
     
      {GetspecifiedError("first_name") ? <div className='alert alert-danger'> 
        {GetspecifiedError("first_name") }
       </div> : ''}

      <label htmlFor="last_name">last_name</label>
      <input   onChange={getUser}  type="text" id='last_name' placeholder='last_name' className='form-control mb-4' />
      
      {GetspecifiedError("last_name") ? <div className='alert alert-danger'> 
        {GetspecifiedError("last_name") }
       </div> : ''}

      <label htmlFor="age">age</label>
      <input  onChange={getUser}   type="number" id='age' placeholder='age' className='form-control mb-4' />
     
      {GetspecifiedError("age") ? <div className='alert alert-danger'> 
        {GetspecifiedError("age") }
       </div> : ''}

      <label htmlFor="email">email</label>
      <input   onChange={getUser} autoComplete="username" type="text" id='email' placeholder='email' className='form-control mb-4' />
      
      {GetspecifiedError("email") ? <div className='alert alert-danger'> 
        {GetspecifiedError("email") }
       </div> : ''}

      <label htmlFor="password">password</label>
      <input   onChange={getUser} autoComplete="current-password" type="password" id='password' placeholder='password' className='form-control mb-4' />
      
      {GetspecifiedError("password") ? <div className='alert alert-danger'> 
        {GetspecifiedError("password") }
       </div> : ''}

      <button   className='btn btn-outline-info'> Register..</button>

      
    </form>
  </div>
  </>

}
