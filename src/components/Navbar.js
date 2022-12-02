import React from 'react'
import { NavLink } from 'react-router-dom'
import Search from './Search'

const Navbar = () => {
  return (
    <div className='flex justify-around bg-slate-800 text-white h-fit max-sm:flex-col'>
      <div className='flex justify-center items-center'>


        <NavLink to={`/`}
          className='p-2 text-4xl flex justify-between items-center text-transparent bg-clip-text bg-gradient-to-r from-[#01b4e4] to-[#90cea1] rounded-2xl'>
          {/* <img
            src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'
            className='h-[48px] m-1'></img> */}
          <i class="bi bi-film"></i>
            <span className='p-2'>MovieDb</span>
            </NavLink>
      </div>
      <div className='flex flex-col items-center justify-center text-slate-400'>
        <div className='flex justify-center items-center text-white text-sm'>Today's top: </div>
        <div className='flex'>
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
        </div>
      </div>
      <div className='w-[50%] max-sm:w-[100%]'>
        <Search></Search>
      </div>
    </div>
  )
}

export default Navbar