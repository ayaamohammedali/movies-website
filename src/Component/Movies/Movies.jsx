import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function Movies() {


    const [allMovies, setAllMovies] = useState(null)

async function getTrendingMovies(){

let {data} = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=5571be5644133f1d5d392bfe16ce9e0b')

setAllMovies(data.results)


}

useEffect(()=>{
  getTrendingMovies()
} , [])



  return <>


    {/* allMovies?  يعني فيه داتا */}
    {allMovies ? <div className="container-fluid"> 
       <div className="row gx-3 gy-3 align-items-center">
         <div className="col-md-4 mt-5 ">
           <div className="trending">
             <div className="upper"></div>
             <h5>trending movies to watch now </h5>
             <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
             <div className="lower"></div>
   
           </div>
   
         </div>
   
         {allMovies.map(function(elm , idx) {return <div key={idx} className="col-md-2">
        <Link  to={`/moviedetails/${elm.id}`} >
           <div className="movie">
             <img className='w-100' src={"https://image.tmdb.org/t/p/w500/" + elm.poster_path} alt="" />
             <h6 className='text-center mt-2'>{elm.title}</h6>
   
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
