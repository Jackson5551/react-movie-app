import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import useTMDB from '../hooks/useTMDB'

const Search = ({ value }) => {

    const navigate = useNavigate()

    const [query, setQuery] = useState('')
    // const [searchData, setSearchData] = useState(null)
    // const [loading, setLoading] = useState(true)
    // const [resultsPage, setResultsPage] = useState(1)

    // const search = async () => {
    //     await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=${resultsPage}`)
    //         .then((response) => {
    //             return response.json()
    //         })
    //         .then((json) => {
    //             console.log(json)
    //             setLoading(false)
    //             setSearchData(json)
    //         })
    // }
    // console.log(searchData)
    const handleSubmit = event => {
        event.preventDefault()
        navigate(`/search/${query}/1`)
        
    }
    return (
        <div className='bg-slate-900 h-fit p-5'>
            {/* <div>
                <input type={'text'} onChange={(e) => setQuery(e.target.value)}></input>



                <Link to={`/search/${query}/1`}>Go</Link>
            </div> */}
            <form
            className=''
            onSubmit={handleSubmit}>

                <div className='flex'>
                    <div
                        className='relative w-full'>
                        <input type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Movies, TV Shows, People..." required onChange={(e) => setQuery(e.target.value) }></input>
                        <button type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </div>
                </div>

            </form>

            {/* <div>
                {loading ? <p>loading</p> : 
                    <div>
                        {searchData.results.map((result)=>{
                            return(
                                <p>{result.title}</p>
                            )
                        })}
                        {searchData.total_pages > 1 ? <div>
                            {searchData.total_pages.map((page)=>{
                                
                            })}
                        </div> : <p></p>}
                    </div>
                }
            </div> */}
        </div>
    )
}

export default Search