import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [allMovies, setAllMovies] = useState(null);
  const [allTv, setAllTv] = useState(null);

  const [allTitle, setAllTitle] = useState(null);
  const [allTitle2, setAllTitle2] = useState(null);
  const [word, setWord] = useState(null);






  async function getTrendingMovies() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=5571be5644133f1d5d392bfe16ce9e0b"
    );

    setAllMovies(data.results);
  }

  async function getTrendingTv() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/week?api_key=5571be5644133f1d5d392bfe16ce9e0b"
    );

    setAllTv(data.results);
  }

  useEffect(() => {
    getTrendingMovies();
    getTrendingTv();
  }, []);

  function searchMovie(e) {
    setWord(e.target.value);

    let allTitlearr = [];
    let allTitlearr2 = [];

    for (let i = 0; i < allMovies.length; i++) {
      if (
        allMovies[i].title.toLowerCase().includes(word.toLowerCase())
      ) {
        allTitlearr.push(allMovies[i]);
      }

    }
    setAllTitle(allTitlearr);


    for (let i = 0; i < allTv.length; i++) {
      if (
        allTv[i].name.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        allTitlearr2.push(allTv[i]);
      }

    }
    setAllTitle2(allTitlearr2);
  }






  return (<React.Fragment>
    <input type="search" onChange={searchMovie} placeholder=" search here  " className="form-control m-auto mb-5 mt-5 w-50 " />


    {allTitle && allTitle2 && word != "" ? <div className="container-fluid">
      <div className="row">
        {allTitle
          ? allTitle.map(function (movie, index) {
            return (
              <div key={index} className="col-md-2 ">
                <Link to={`/movieDetails/${movie.id}`}>
                  <img
                    className="w-100"
                    src={
                      "https://image.tmdb.org/t/p/w500/" + movie.poster_path
                    }
                    style={{ cursor: "pointer" }}
                    alt="moive image"
                  />
                  <p className="text-center text-white mt-1">{movie.title}</p>
                </Link>
              </div>
            );
          })
          : ""}

        {allTitle2
          ? allTitle2.map(function (tv, index) {
            return (
              <div key={index} className="col-md-2 ">
                <Link to={`/tvdetails/${tv.id}`}>
                  <img
                    className="w-100"
                    src={
                      "https://image.tmdb.org/t/p/w500/" + tv.poster_path
                    }
                    style={{ cursor: "pointer" }}
                    alt="moive image"
                  />
                  <p className="text-center text-white mt-1">{tv.name}</p>
                </Link>
              </div>
            );
          })
          : ""}
      </div>
    </div>
    
    :
    
    
    <>

      {allMovies && allTv ? <div className="container-fluid">

        <div className="row gx-3 gy-3 align-items-center">
          <div className="col-md-4 mt-5 ">
            <div className="trending">
              <div className="upper"></div>
              <h5>trending movies to watch now </h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
              <div className="lower"></div>

            </div>

          </div>

          {allMovies.map(function (elm, idx) {
            return <div  key={idx} className="col-md-2">
              <Link to={`/moviedetails/${elm.id}`} >
                <div className="movie">
                  <img className='w-100' src={"https://image.tmdb.org/t/p/w500/" + elm.poster_path} alt="" />
                  <h6 className='text-center mt-2'>{elm.title}</h6>

                </div>
              </Link>
            </div>
          })}
        </div>

        <div className="row gx-3 gy-3 align-items-center mt-5">
          <div className="col-md-4 mt-5 ">
            <div className="trending">
              <div className="upper"></div>
              <h5>trending tv to watch now </h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
              <div className="lower"></div>

            </div>

          </div>

          {allTv.map(function (elm, idx) {
            return <div key={idx} className="col-md-2">
              <Link to={`/tvdetails/${elm.id}`} >
                <div className="movie">
                  <img className='w-100' src={"https://image.tmdb.org/t/p/w500/" + elm.poster_path} alt="" />
                  <h6 className='text-center mt-2'>{elm.name}</h6>

                </div>
              </Link>
            </div>
          })}
        </div>

      </div> : <div className="vh-100 d-flex justify-content-center align-items-center ">
        <div className="fa-solid fa-spinner fa-5x text-white fa-spin "></div>
      </div>}
    </>}


  </React.Fragment>)
}