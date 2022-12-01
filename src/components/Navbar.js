import React from 'react'
import { NavLink } from 'react-router-dom'
import Search from './Search'

const Navbar = () => {
  return (
    <div className='flex justify-around bg-slate-900 text-white h-fit'>
        <div className='flex justify-center items-center hover:text-blue-600'>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-film" viewBox="0 0 16 16">
                  <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
              </svg>
            <NavLink to={`/`}
            className='p-2 text-3xl'>Home</NavLink>
        </div>
          <div className='flex justify-center items-center hover:text-blue-600'>
            <NavLink to={`/movies`}
                  className='p-2 text-xl'>Movies</NavLink>
        </div>
          <div className='flex justify-center items-center hover:text-blue-600'>
            <NavLink to={`/tvshows`}
            className='p-2 text-xl'>TV</NavLink>
        </div>
          <div className='flex justify-center items-center hover:text-blue-600'>
            <NavLink to={`/people`}
            className='p-2 text-xl'>People</NavLink>
        </div>
        <div className='w-[50%]'>
            <Search></Search>
        </div>
    </div>
  )
}

export default Navbar