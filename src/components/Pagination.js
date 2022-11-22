import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import SearchResult from './SearchResult'

const renderData = (data) => {
    return (
        // <ul>
        //     {data.results.map((result) => {
        //         if (result.media_type === 'movie') return <li><Link to={`/movies/${result.id}`}>{result.title}</Link></li>
        //         if (result.media_type === 'tv') return <li><Link to={`/tvshows/${result.id}`}>{result.name}</Link></li>
        //         else return <li>{result.name}</li>
        //     })}
        // </ul>
        <SearchResult results={data.results}></SearchResult>
    )
}

const Pagination = (props) => {
    let navigate = useNavigate()
    const {
        currentPage,
        maxPageLimit,
        minPageLimit
    } = props
    const totalPages = props.searchData.total_pages
    const searchData = props.searchData
    console.log(totalPages)


    const pages = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    const handlePrevClick = () => {
        props.onPrevClick()
    }

    const handleNextClick = () => {
        props.onNextClick()
    }

    const pageNumbers = pages.map(page => {
        if (page <= maxPageLimit && page > minPageLimit) {
            return (
                <li>{page}</li>
            )
        } else {
            return null
        }
    })

    let pageIncrementEllipses = null
    if (pages.length > maxPageLimit) {
        pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>
    }

    let pageDecrementEllipses = null
    if (maxPageLimit >= 1) {
        pageDecrementEllipses = <li onClick={handlePrevClick}>&hellip;</li>
    }

    return (
        <div>
            <div className=''>
                {renderData(searchData)}
            </div>
            <ul>
                <li>
                    <button onClick={handlePrevClick} disabled={(currentPage === pages[0])}>Prev</button>
                </li>
                {pageDecrementEllipses}
                {pageNumbers}
                {pageIncrementEllipses}
                <li>
                    <button onClick={handleNextClick} disabled={currentPage === pages[pages.length - 1]}>Next</button>
                </li>
            </ul>
        </div>
    )
}

export default Pagination