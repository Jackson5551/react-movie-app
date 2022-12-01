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
        navigate(`/search/${query}`)
        
    }
    return (
        <div className='h-fit p-5'>

            <form
            className=''
            onSubmit={handleSubmit}>

                <div className='flex'>
                    <div
                        className='relative w-full'>
                        <input type="text" class="block p-2.5 w-full z-20 text-sm rounded-md text-white bg-slate-600 border-solid border-2 border-transparent focus:ring-transparent focus:border-blue-500" placeholder="Search Movies, TV Shows, People..." required onChange={(e) => setQuery(e.target.value) }></input>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Search