import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Search from './components/Search'

const SearchResults = () => {
  const [searchData, setSearchData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [resultPages, setResultPages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  let { query, page } = useParams()
  // let resultPages

  async function search(){
    await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=${page}`)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        console.log(json)
        setLoading(false)
        setSearchData(json)
        let temp
        temp = Array.from(Array(parseInt(json.total_pages)).keys())
        temp.toString().split('')
        setResultPages(temp)
        console.log(temp)
      })
  }

  useEffect(()=>{
    search()
  },[query,page])



  return (
    <div>
      <Search value={query}></Search>
      <div>
        {loading ? <p>loading</p> :
          <div>
            {searchData.results.map((result) => {
              if (result.media_type === 'movie') return <p><Link to={`/movies/${result.id}`}>{result.title}</Link></p>
              if (result.media_type === 'tv') return <p><Link to={`/tvshows/${result.id}`}>{result.name}</Link></p>
              else return <p>{result.name}</p>
            })}
            {searchData.total_pages > 1 ? <div>
              <span>
              {
                
                resultPages.map((pageNum)=>{
                  return(
                    <span> <Link to={`/search/${query}/${pageNum+1}`}>{pageNum+1}</Link> </span>
                  )
                })
              }
              </span>
            </div> : <p></p>}
          </div>
        }
      </div>
    </div>
  )
}

export default SearchResults