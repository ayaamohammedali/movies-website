import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Tv() {

      
const [allTv, setAllTv] = useState(null)
  
  
async function getTrendingTv(){

let {data} = await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=5571be5644133f1d5d392bfe16ce9e0b')

setAllTv(data.results)



}

useEffect(()=>{
  getTrendingTv()
} , [])


  return <>
 

  {/* allMovies?  يعني فيه داتا */}
  { allTv ? <div className="container-fluid">    
     <div className="row gx-3 gy-3 align-items-center mt-5">
       <div className="col-md-4 mt-5 ">
         <div className="trending">
           <div className="upper"></div>
           <h5>trending tv to watch now </h5>
           <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
           <div className="lower"></div>
 
         </div>
 
       </div>
 
       {allTv.map(function(elm , idx) {return <div key={idx} className="col-md-2">
      <Link  to={`/tvdetails/${elm.id}`} >
         <div className="movie">
           <img className='w-100' src={"https://image.tmdb.org/t/p/w500/" + elm.poster_path} alt="" />
           <h6 className='text-center mt-2'>{elm.name}</h6>
 
         </div>
      </Link>
       </div>})}
     </div>
 
     
   </div>
   
   
   :  <div className="vh-100 d-flex justify-content-center align-items-center ">
     <div className="fa-solid fa-spinner fa-5x text-white fa-spin "></div>
   </div>} 
 
    
   
   </>
}
