import React from 'react'
import { Link, useParams } from 'react-router-dom'

const SearchResult = ({ results }) => {
    const { query, page } = useParams()
    document.title = `Results for '${query}'`
    return (
        // <Link>
        <div className=' min-h-screen bg-gradient-to-r from-[#01b4e4] to-[#90cea1]'>
            <div className='w-full h-full min-h-screen bg-slate-800/90'>
                <div
                    className='flex justify-center'>
                    <h1 className='text-white text-2xl p-2'>Results for "{query}"</h1>
                </div>
                <ul className='flex flex-wrap justify-center box-border'>
                    {results.map((result) => {
                        // <img src={`https://image.tmdb.org/t/p/w500/${results.poster_path}`}></img>
                        let imgUrl = `https://image.tmdb.org/t/p/w500${result.poster_path}`

                        if (result.media_type === 'movie') return <li className='m-3 box-border'>
                            <Link to={`/movies/${result.id}`}>
                                {result.poster_path ? <img src={imgUrl}
                                    className='w-96 h-full min-h-[550px] max-h-full hover:shadow-2xl border-solid border-transparent border-2 hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 box-border hover:box-border rounded-2xl'
                                    alt={result.title}></img> : <div className='flex justify-center items-center w-96 bg-slate-600 h-full text-white border-solid border-transparent border-2 hover:shadow-2xl hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 box-border hover:box-border rounded-2xl'><p>{result.title}</p></div>}
                            </Link>
                        </li>
                        if (result.media_type === 'tv') return <li className='m-3 box-border'>

                            <Link to={`/tvshows/${result.id}`}>
                                {result.poster_path ? <img src={imgUrl}
                                    className='w-96 hover:shadow-2xl h-full min-h-[550px] max-h-full border-solid border-transparent border-2 hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 box-border hover:box-border rounded-2xl'
                                    alt={result.name}></img> : <div className='flex justify-center items-center w-96 bg-slate-600 h-full min-h-[550px] text-white border-solid border-transparent border-2 hover:shadow-2xl hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 box-border hover:box-border rounded-2xl'><p>{result.name}</p></div>}
                            </Link>
                        </li>
                        else return <li className='w-96 m-3 box-border'>
                            <Link to={`/people/${result.id}`}>
                                {result.profile_path ? <div className='relative hover:shadow-2xl border-solid border-transparent border-2 hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 box-border hover:box-border rounded-2xl'>
                                <img src={`https://image.tmdb.org/t/p/w500${result.profile_path}`}
                                        className='w-96 h-full min-h-[550px] max-h-full rounded-2xl border-solid border-transparent border-2'
                                        alt={result.name}></img> <p className='absolute text-3xl text-center text-white top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-600/90 p-6 rounded-xl'>{result.name}</p></div> : <div className='flex justify-center items-center w-96 bg-slate-600 h-full min-h-[550px] text-white border-solid border-transparent border-2 hover:shadow-2xl hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 box-border hover:box-border rounded-2xl'><p>{result.name}</p></div>}
                            </Link>
                        </li>
                    })}
                </ul>
            </div>
        </div>
        // </Link>
    )
}

export default SearchResult