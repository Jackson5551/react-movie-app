import React from 'react'
import { Link, useParams } from 'react-router-dom'

const SearchResult = ({ results }) => {
    const { query, page } = useParams()
    document.title = `Results for '${query}'`
    return (
        // <Link>
        <div className='w-full h-full bg-slate-800'>
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
                            <img src={imgUrl}
                                className='w-96 hover:shadow-2xl hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 box-border hover:box-border'
                                alt={result.title}></img>
                        </Link>
                    </li>
                    if (result.media_type === 'tv') return <li className='m-3 box-border'>

                        <Link to={`/tvshows/${result.id}`}>
                            <img src={imgUrl}
                                className='w-96 hover:shadow-2xl hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 box-border hover:box-border'
                                alt={result.name}></img>
                        </Link>
                    </li>
                    else return <li className='w-96 m-3 box-border'>
                        <Link>
                            <img src={`https://image.tmdb.org/t/p/w500${result.profile_path}`}
                                className='w-96 hover:shadow-2xl hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 rounded-full box-border hover:box-border'
                                alt={result.name}></img>
                        </Link>
                    </li>
                })}
            </ul>
        </div>
        // </Link>
    )
}

export default SearchResult