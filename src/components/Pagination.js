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
    const handlePageClick = (e) => {
        props.onPageChange(Number(e.target.id));
    }
    const handleGotoFirstPageClick = () => {
        props.onGotoFirstPageClick()
    }
    const handleGotoLastPageClick = () => {
        props.onGotoLastPageClick()
    }

    const pageNumbers = pages.map(page => {
        if (page <= maxPageLimit && page > minPageLimit) {
            return (
                <li
                    className={currentPage === page ? 'border-solid border-2 border-slate-400 bg-slate-400 rounded-xl text-white m-2 p-2 cursor-pointer' : 'text-white m-2 p-2 cursor-pointer hover:underline'}
                    id={page}
                    onClick={handlePageClick}>{page}</li>
            )
        } else {
            return null
        }
    })

    let pageIncrementEllipses = null
    if (pages.length > maxPageLimit) {
        pageIncrementEllipses = <li className='text-white cursor-pointer' onClick={handleGotoLastPageClick}>&rsaquo;&rsaquo;</li>
    }

    let pageDecrementEllipses = null
    if (minPageLimit >= 1) {
        pageDecrementEllipses = <li className='text-white cursor-pointer' onClick={handleGotoFirstPageClick}>&lsaquo;&lsaquo;</li>
    }

    return (
        <div>
            <ul className='flex justify-center items-center h-full w-full bg-slate-800 max-sm:flex-col'>
                <li>
                    <button
                        className='p-2 m-2 text-white cursor-pointer disabled:hidden'
                        onClick={handlePrevClick} disabled={(currentPage === pages[0])}>&larr; Prev</button>
                </li>
                {pageDecrementEllipses}
                <div className='flex'>{pageNumbers}</div>
                {pageIncrementEllipses}
                <li>
                    <button
                        className='p-2 m-2 text-white cursor-pointer disabled:hidden'
                        onClick={handleNextClick} disabled={currentPage === pages[pages.length - 1]}>Next &rarr;</button>
                </li>
            </ul>
            <div>
                {renderData(searchData)}
            </div>
            <ul className='flex justify-center items-center h-full w-full bg-slate-800 max-sm:flex-col'>
                <li>
                    <button
                        className='p-2 m-2 text-white cursor-pointer disabled:hidden'
                        onClick={handlePrevClick} disabled={(currentPage === pages[0])}>&larr; Prev</button>
                </li>
                {pageDecrementEllipses}
                <div className='flex'>{pageNumbers}</div>
                {pageIncrementEllipses}
                <li>
                    <button
                        className='p-2 m-2 text-white cursor-pointer disabled:hidden'
                        onClick={handleNextClick} disabled={currentPage === pages[pages.length - 1]}>Next &rarr;</button>
                </li>
            </ul>
        </div>
    )
}

export default Pagination