import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Loading from './Loading'

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((json) => { setPopularMovies(json); console.log(json); setLoading(false) })
  }, [])

  document.title = "Top Movies"
  if (loading) {
    return (<Loading></Loading>)
  } else {
    return (
      <>
        <Navbar></Navbar>
        <div className='w-full h-full bg-gradient-to-r from-[#01b4e4] to-[#90cea1]'>
        <div className='min-w-full min-h-full bg-slate-800/90'>
          <div
            className='flex justify-center'>
            <h1 className='text-white text-2xl p-2'>Today's Top Movies</h1>
          </div>
          <ul className='flex flex-wrap justify-center box-border'>
            {popularMovies.results.map(movie => {
              let imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

              return (
                <li className='m-3 box-border'>
                  <Link to={`/movies/${movie.id}`}>
                    {movie.poster_path ? <img src={imgUrl}
                      className='w-96 h-full min-h-[550px] max-h-full hover:shadow-2xl border-solid border-transparent border-2 hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 box-border hover:box-border rounded-2xl'
                      alt={movie.title}></img> : <div className='flex justify-center items-center w-96 bg-slate-600 h-full text-white border-solid border-transparent border-2 hover:shadow-2xl hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 box-border hover:box-border rounded-2xl'><p>{movie.title}</p></div>}
                  </Link>
                </li>)
            })}
          </ul>
        </div>
      </div>
      </>
    )
  }
}

export default Movies