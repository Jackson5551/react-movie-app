import React, { useContext, useMemo, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Search from '../../components/Search'
import { SearchQueryContext } from '../../context/SearchQueryContext'

const MovieApp = () => {
  const navigate = useNavigate()

  const api_key = import.meta.env.VITE_TMDB_API_KEY;


  const [query, setQuery] = useState('')
  const [searchCategory, setSearchCategory] = useState('multi')

  const { searchQuery, setSearchQuery } = useContext(SearchQueryContext);

  const value = useMemo(
    () => ({ query, setQuery }),
    [query]
  );
  const handleSubmit = event => {
    event.preventDefault()
    navigate(`/search/${query}/${searchCategory}`)

  }
  document.title = "MovieDb"
  return (
    // <div className='bg-gradient-to-r from-[#01b4e4] to-[#90cea1] h-screen w-screen flex justify-center items-center'>
    <SearchQueryContext.Provider value={value}>
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 h-screen w-screen flex justify-center items-center'>
      <div className='w-full h-full flex flex-col justify-around bg-blur bg-slate-800/60 p-5'>
        {/* <h1 className='text-4xl text-white text-center'>Search TMDb</h1> */}
        <div className='flex justify-center'>
          <div className='flex justify-center items-center'>


            <NavLink to={`/`}
              className='text-6xl flex justify-center items-center text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500'>
              {/* <img
            src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'
            className='h-[48px] m-1'></img> */}
              <i class="bi bi-film"></i>
              <span className='p-2'>MovieDb</span>
            </NavLink>
          </div>
        </div>
        <div className='rounded-3xl w-full flex justify-center'>
          <div className='h-fit p-5 m-5 w-[80%] max-sm:w-full max-sm:m-0'>

            <form
              className=''
              onSubmit={handleSubmit}>

              <div className='flex justify-center items-center max-sm:flex-col'>
                <div className='max-sm:relative max-sm:w-full max-sm:p-5'>
                  <select className='border-solid border-2 border-[#0d253f] bg-[#0d253f] text-white p-4 w-fit max-sm:w-full rounded-l-2xl max-sm:rounded-2xl' onChange={(e) => setSearchCategory(e.target.value)}>
                    <option value={'multi'} selected>All</option>
                    <option value={'movie'}>Movies</option>
                    <option value={'tv'}>TV</option>
                    <option value={'person'}>People</option>
                    {/* <option value={'collection'}>Collections</option> */}
                  </select>
                </div>
                <div
                  className='relative w-full'>
                  
                    <input type="text" class="block p-4 w-full text-sm text-slate-800 bg-white border-solid border-2 border-transparent focus:ring-transparent focus:border-blue-500 max-sm:rounded-2xl" placeholder="Search Movies, TV Shows, People..." required onChange={(e) => {setQuery(e.target.value);}}></input>
                </div>
                <div className='max-sm:relative max-sm:w-full max-sm:p-5'>
                  <button
                    type='submit'
                    className='border-solid border-2 border-[#0d253f] bg-[#0d253f] text-white p-4 w-full rounded-r-2xl max-sm:rounded-2xl'>Search</button>
                </div>
              </div>

            </form>
            <span className='flex justify-center items-center p-2 text-slate-400'>Powered by - <a href='https://www.themoviedb.org/' target={'_blank'}>TMDb</a></span>
          </div>

        </div>
        <div className='flex flex-col text-slate-400 text-center'>
          <span className='text-white'>Browse today's top...</span>
          <span className='text-2xl'><Link to={"/movies"}>Movies</Link> &bull; <Link to={"/tvshows"}>TV</Link> &bull; <Link to={"/people"}>People</Link></span>
        </div>
      </div>
    </div>
    </SearchQueryContext.Provider >
  )
}

export default MovieApp