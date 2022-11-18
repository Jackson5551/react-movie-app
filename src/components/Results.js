import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Pagination from './Pagination'
import Search from './Search'

const Results = () => {
    const pageNumberLimit = 5
    const [searchData, setSearchData] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [maxPageLimit, setMaxPageLimit] = useState(5)
    const [minPageLimit, setMinPageLimit] = useState(0)

    let { query, page } = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        setSearchQuery(query)
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=${currentPage}`)
            .then((res) => res.json())
            .then((json) => { setSearchData(json); setLoading(false); console.log(json)})

        if(query !== searchQuery){
            setSearchQuery(query)
        }
        if(page !== currentPage){
            setCurrentPage(page)
        }
    }, [currentPage,searchQuery, query, page])

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const onPrevClick = () => {
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageLimit(maxPageLimit - pageNumberLimit)
            setMinPageLimit(minPageLimit - pageNumberLimit)
        }
        setCurrentPage(prev => prev - 1)
        navigate(`/search/${query}/${+page-1}`)
    }

    const onNextClick = () => {
        if (currentPage + 1 > maxPageLimit) {
            setMaxPageLimit(maxPageLimit + pageNumberLimit)
            setMinPageLimit(minPageLimit + pageNumberLimit)
        }
        setCurrentPage(prev => prev + 1)
        navigate(`/search/${query}/${+page+1}`)
    }

    const paginationAttribs = {
        currentPage,
        maxPageLimit,
        minPageLimit,
        // response: searchData
        searchData
    }
    console.log(paginationAttribs)
    return (
        <div>
            <Search></Search>
            {!loading ?
            <Pagination
                {...paginationAttribs}
                onPrevClick={onPrevClick}
                onNextClick={onNextClick}
                onPageChange={onPageChange}
            />
            : <div>Loading...</div>
            }
        </div>
    )
}

export default Results