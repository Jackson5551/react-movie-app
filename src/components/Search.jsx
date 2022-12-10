import React, { useContext, useState } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { SearchQueryContext } from '../context/SearchQueryContext'


const Search = ({ value }) => {

    const {searchQuery, setSearchQuery} = useContext(SearchQueryContext)

    const {query, searchCategory} = useParams()

    const navigate = useNavigate()
    const [searchCategory2, setSearchCategory] = useState('multi')
    const [query_, setQuery] = useState(query)
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
        navigate(`/search/${query_}/${searchCategory2}`)

    }
    return (
        <div className='h-fit p-5 m-5 w-full max-sm:w-full max-sm:m-0 text-xs'>

            <form
                className=''
                onSubmit={handleSubmit}>

                <div className='flex justify-center items-center max-sm:flex-col'>
                    <div className='max-sm:relative max-sm:w-full max-sm:p-5'>
                        <select className='border-solid border-2 border-slate-500 bg-slate-500 text-white p-2 w-fit max-sm:w-full rounded-l-xl max-sm:rounded-xl' onChange={(e) => setSearchCategory(e.target.value)}>
                            <option value={'multi'} selected>All</option>
                            <option value={'movie'}>Movies</option>
                            <option value={'tv'}>TV</option>
                            <option value={'person'}>People</option>
                            {/* <option value={'collection'}>Collections</option> */}
                        </select>
                    </div>
                    <div
                        className='relative w-full'>

                            <input type="text" class="block p-2 w-full text-xs text-slate-800 bg-white border-solid border-2 border-transparent focus:ring-transparent focus:border-blue-500 max-sm:rounded-xl" placeholder="Search Movies, TV Shows, People..." value={query_} required onChange={(e) => {setQuery(e.target.value); setSearchQuery(e.target.value)}}></input>

                    </div>
                    <div className='max-sm:relative max-sm:w-full max-sm:p-2'>
                        <button
                            type='submit'
                            className='border-solid border-2 border-slate-500 bg-slate-500 text-white p-2 w-full rounded-r-xl max-sm:rounded-xl'>Search</button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Search