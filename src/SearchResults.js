import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const SearchResults = () => {
  const [searchData, setSearchData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [resultPages, setResultPages] = useState([])

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
  },[page])



  return (
    <div>
      <div>
        {loading ? <p>loading</p> :
          <div>
            {searchData.results.map((result) => {
              return (
                <p>{result.title || result.name}</p>
              )
            })}
            {searchData.total_pages > 1 ? <div>
              {
                // Array.from(Array(parseInt(searchData.total_pages)).keys())
                resultPages.map((page)=>{
                  return(
                    <Link to={`/search/${query}/${page+1}`}>{page+1}</Link>
                  )
                })
              }
              {/* {searchData.total_pages.map((page) => {
                return(
                  <p>here</p>
                )
              })} */}
            </div> : <p></p>}
          </div>
        }
      </div>
    </div>
  )
}

export default SearchResults