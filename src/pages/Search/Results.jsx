import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../Loading'
import Navbar from '../../components/Navbar'
import Pagination from './Pagination'

const Results = () => {
    const pageNumberLimit = 5
    const [searchData, setSearchData] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [maxPageLimit, setMaxPageLimit] = useState(5)
    const [minPageLimit, setMinPageLimit] = useState(0)

    const api_key = import.meta.env.VITE_TMDB_API_KEY;

    let { query, searchCategory } = useParams()
    useEffect(() => {
        setLoading(true)
        setCurrentPage(1)
        setMaxPageLimit(5);
        setMinPageLimit(0);
        fetch(`https://api.themoviedb.org/3/search/${searchCategory}?api_key=${api_key}&include_adult=false&query=${query}&page=1`)
            .then((res) => res.json())
            .then((json) => { setSearchData(json); setLoading(false); console.log(json) })
    }, [query, searchCategory])
    useEffect(() => {
        setLoading(true)
        fetch(`https://api.themoviedb.org/3/search/${searchCategory}?api_key=${api_key}&include_adult=false&query=${query}&page=${currentPage}`)
            .then((res) => res.json())
            .then((json) => { setSearchData(json); setLoading(false); console.log(json) })
    }, [currentPage])

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