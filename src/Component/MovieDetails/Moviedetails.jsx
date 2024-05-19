import React from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import  { useState } from 'react'

export default function Moviedetails() {

       
let myOpject = useParams()


const [movieDetails, setMovieDetails] = useState({})

async function getMovieDetails(){

    let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${myOpject.id}?api_key=5571be5644133f1d5d392bfe16ce9e0b&language=en-US`)
    setMovieDetails(data)

}

useEffect(()=>{


    getMovieDetails()



} , [])


  return <>
  
  { movieDetails? <div className="container">
      <div className="row">
          <div className="col-md-4">
              <div className="myImg">
              <img  className='w-100 ' src={"https://image.tmdb.org/t/p/w500/" + movieDetails.poster_path} alt="" />
  
              </div>
          </div>
          <div className="col-md-8">
              <div className="">
                  <h3  className='mt-5'>{movieDetails.original_title}</h3>
                  <p  className='mt-5 mb-5'>{movieDetails.overview}</p>
                  {movieDetails.genres?.map( (elm , idx) => { return <span key={idx} className = 'bg-info text-white me-3 p-1 ps-2 pe-2' >
                      {elm.name}
  
                  </span>})}
  
  
                  <p className='mt-5'> vote : {movieDetails.vote_average}</p>
                  <p className='mt-5'> vote count : {movieDetails.vote_count}</p>
                  <p className='mt-5'>popularity : {movieDetails.popularity}</p>
                  <p className='mt-5'>release date :{movieDetails.release_date}</p>
  
              </div>
  
          </div>
  
      </div>
    </div> :
    <div className="vh-100 d-flex justify-content-center align-items-center ">
    <div className="fa-solid fa-spinner fa-5x text-white fa-spin "></div>
  </div>}
  
  
    </>
}
