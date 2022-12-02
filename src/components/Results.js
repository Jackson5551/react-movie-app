import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../Loading'
import Navbar from './Navbar'
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

    let { query, searchCategory } = useParams()
    let navigate = useNavigate()
    useEffect(() => {
        setLoading(true)

        if (searchQuery !== query && currentPage !== 1) {
            setCurrentPage(1);
            setMaxPageLimit(5);
            setMinPageLimit(0);
        }
        setSearchQuery(query)
            fetch(`https://api.themoviedb.org/3/search/${searchCategory}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&include_adult=false&query=${query}&page=${currentPage}`)
                .then((res) => res.json())
                .then((json) => { setSearchData(json); setLoading(false); console.log(json) })
        if (query !== searchQuery) {
            setSearchQuery(query)
        }
    }, [currentPage, searchQuery, query, searchCategory])

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const onPrevClick = () => {
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageLimit(maxPageLimit - pageNumberLimit)
            setMinPageLimit(minPageLimit - pageNumberLimit)
        }
        setCurrentPage(prev => prev - 1)
    }

    const onNextClick = () => {
        if (currentPage + 1 > maxPageLimit) {
            setMaxPageLimit(maxPageLimit + pageNumberLimit)
            setMinPageLimit(minPageLimit + pageNumberLimit)
        }
        setCurrentPage(prev => prev + 1)
        // navigate(`/search/${query}/${+page+1}`)
    }
    const onGotoFirstPageClick = () => {
        setMaxPageLimit(5)
        setMinPageLimit(0)
        setCurrentPage(1)
    }
    const onGotoLastPageClick = () => {
        setMaxPageLimit(searchData.total_pages)
        setMinPageLimit(searchData.total_pages - pageNumberLimit)
        setCurrentPage(searchData.total_pages)
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
            <Navbar></Navbar>
            {!loading ?
                <Pagination
                    {...paginationAttribs}
                    onPrevClick={onPrevClick}
                    onNextClick={onNextClick}
                    onPageChange={onPageChange}
                    onGotoFirstPageClick={onGotoFirstPageClick}
                    onGotoLastPageClick={onGotoLastPageClick}
                />
                : <Loading></Loading>
            }
        </div>
    )
}

export default Results