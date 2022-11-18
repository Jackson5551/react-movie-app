import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import useTMDB from '../hooks/useTMDB'

const Search = ({value}) => {
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
    return (
        <div>
            <div>
                <input type={'text'} onChange={(e) => setQuery(e.target.value)}></input>
                
                {/* <button onClick={() => search()}>Go</button> */}
                {/* <Link to={`search/${query}/${resultsPage}`}>Go</Link> */}
                <Link to={`/search/${query}/1`}>Go</Link>
            </div>
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