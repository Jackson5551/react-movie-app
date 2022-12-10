import React from 'react'
import { Link, useParams } from 'react-router-dom'
import empty from '../../img/empty.png'
import ResultCard from '../../components/ResultCard'

const SearchResult = ({ results }) => {
    const { query, searchCategory } = useParams()
    document.title = `Results for '${query}'`
    return (
        // <Link>
        <div className=' min-h-screen w-screen bg-gradient-to-r from-cyan-500 to-blue-500'>
            <div className='w-full h-full min-h-screen bg-slate-800/90'>
                <div
                    className='flex justify-center'>
                    <h1 className='text-white text-2xl p-2'>Results for "{query}"</h1>
                </div>
                <ul className='flex flex-wrap justify-center items-center box-border text-center'>
                    {results.map((result) => {
                        let imgUrl = `https://image.tmdb.org/t/p/w500${result.poster_path}`

                        if (result.media_type === 'movie' || searchCategory === 'movie') return (
                            <ResultCard
                                result={result}
                                category={'movies'}
                                img_path={result.poster_path}></ResultCard>)
                        if (result.media_type === 'tv' || searchCategory === 'tv') return (
                            <ResultCard
                                result={result}
                                category={'tvshows'}
                                img_path={result.poster_path}></ResultCard>
                        )
                        if (searchCategory === 'person' || searchCategory === 'multi') return (
                            <ResultCard
                                result={result}
                                category={'people'}
                                img_path={result.profile_path}></ResultCard>
                        )
                        if (searchCategory === 'collection') return <li className='m-3 box-border'>
                            <Link to={`/collection/${result.id}`}>
                                {result.poster_path ? <img src={imgUrl}
                                    className='w-96 h-full min-h-[550px] max-h-full hover:shadow-2xl border-solid border-transparent border-2 hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 box-border hover:box-border rounded-2xl'
                                    alt={result.name}></img> : <div className='relative hover:shadow-2xl border-solid border-transparent border-2 hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 box-border hover:box-border rounded-2xl'>
                                    <img src={empty}
                                        className='w-96 h-full min-h-[550px] max-h-full rounded-2xl border-solid border-transparent border-2'></img><p className='absolute text-3xl text-center text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6'>{result.name}</p></div>}
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