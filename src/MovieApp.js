import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Search from './components/Search'

const MovieApp = () => {
  const navigate = useNavigate()

  const [query, setQuery] = useState('')
  const handleSubmit = event => {
    event.preventDefault()
    navigate(`/search/${query}`)

  }
  return (
    <div className='bg-gradient-to-r from-[#01b4e4] to-[#90cea1] h-screen w-screen flex justify-center items-center'>
      <div className='w-full h-full flex flex-col justify-around bg-blur bg-slate-800/60 p-5'>
        {/* <h1 className='text-4xl text-white text-center'>Search TMDb</h1> */}
        <div className='flex justify-center'>
          <img
            src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'
            className='h-32'></img>
        </div>
        <div className='rounded-3xl w-full flex justify-center'>
          <div className='h-fit p-5 m-5 w-[80%] max-sm:w-full'>

            <form
              className=''
              onSubmit={handleSubmit}>

              <div className='flex justify-center items-center'>
                <div
                  className='relative w-full'>
                  <input type="text" class="block p-4 w-full z-20 text-sm rounded-l-2xl text-slate-800 bg-white border-solid border-2 border-transparent focus:ring-transparent focus:border-blue-500" placeholder="Search Movies, TV Shows, People..." required onChange={(e) => setQuery(e.target.value)}></input>
                </div>
                <div>
                  <button
                  type='submit'
                    className='border-solid border-2 border-[#0d253f] bg-[#0d253f] text-white p-4 w-full rounded-r-2xl'>Search</button>
                </div>
              </div>

            </form>
          </div>
        </div>
        <div className='flex flex-col text-slate-400 text-center'>
          <span className='text-white'>Browse today's top...</span>
          <span className='text-2xl'><Link to={"/movies"}>Movies</Link> &bull; <Link to={"/tvshows"}>TV</Link> &bull; <Link to={"/people"}>People</Link></span>
        </div>
      </div>
    </div>
  )
}

export default MovieApp