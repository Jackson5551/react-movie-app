import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LocationContext } from './context/LocationContext'
import Loading from './Loading'

const Movie = () => {
    const [movieData, setMovieData] = useState({})
    const [contentRatings, setContentRatings] = useState(null)
    const [watchProviders, setWatchProviders] = useState(null)
    const [credits, setCredits] = useState(null)
    const [loading, setLoading] = useState(true)

    let { movieId } = useParams()
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
            .then((res) => res.json())
            .then((json) => { setMovieData(json); console.log(json) })
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
            .then((res) => res.json())
            .then((json) => { setContentRatings(json.results); console.log(json.results) })
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&locale=US`)
            .then((res) => res.json())
            .then((json) => { setWatchProviders(json.results.US); console.log(json.results.US) })
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&locale=US`)
            .then((res) => res.json())
            .then((json) => { setCredits(json); setLoading(false); console.log(json) })


    }, [])
    const {
        adult,
        backdrop_path,
        belongs_to_collection,
        budget,
        genres,
        homepage,
        id,
        imdb_id,
        original_language,
        original_title,
        overview,
        popularity,
        poster_path,
        production_companies,
        production_countries,
        release_date,
        revenue,
        runtime,
        spoken_languages,
        status,
        tagline,
        title,
        video,
        vote_average,
        vote_count
    } = movieData

    let backdropImageUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`
    let posterImageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`

    let releaseDateFormatted = new Date(release_date)

    const location = useContext(LocationContext)

    const [counter, setCounter] = useState(0)

    document.title = movieData.title ? movieData.title : 'Loading Movie'
    if (loading) {
        return (<Loading></Loading>)
    } else {
        return (
            <div
                style={{
                    'var(--image-url)': backdropImageUrl,
                    'backgroundImage': `url(${backdropImageUrl})`,
                    'backgroundAttachment': 'fixed'
                }}
                className="w-full h-full bg-center bg-cover bg-no-repeat bg-fixed">
                <div className='backdrop-blur-lg bg-slate-800/50 p-3 h-full'>
                    <div className='flex h-full w-full min-h-[50vh]'>
                        <div>
                            {/* <p>{tagline}</p> */}
                            {/* <img src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                        className='rounded-3xl'></img> */}
                            <div
                                style={{
                                    'backgroundImage': `url(${posterImageUrl})`
                                }}
                                className='w-96 h-full bg-center bg-contain bg-no-repeat drop-shadow-2xl'>

                            </div>

                        </div>
                        <div className='flex-col ml-2 w-full'>
                            <div className='text-slate-400 bg-slate-800 p-5 h-fit mb-2'>
                                <span><a href={homepage} target='_blank'><h1 className="text-4xl text-white hover:text-blue-600">{title} ({releaseDateFormatted.getFullYear()})</h1></a><p className='italic'>{tagline}</p></span>
                                {/* <p>{release_date}</p> */}
                                <div>

                                    {contentRatings && contentRatings.map(rating => {
                                        if (rating.iso_3166_1 === location) {
                                            
                                            if (rating.release_dates[counter].certification !== '') {
                                                return <p className='text-xs border-2 border-yellow-500 p-1 text-yellow-500 w-fit'>{rating.release_dates[counter].certification}</p>
                                            }
                                            else{
                                                setCounter(counter + 1)
                                            }
                                        }
                                    })}
                                </div>
                                <p>{overview}</p>
                            </div>
                            {watchProviders ?
                                <div className='h-fit p-5 text-white flex-col'>
                                    {watchProviders.buy && <h1>Buy</h1>}
                                    <div className='flex h-fit p-1 flex-wrap'>
                                        {watchProviders.buy?.map(provider => {
                                            return (
                                                <img src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} className='rounded-2xl w-12 m-1'></img>
                                            )
                                        })}
                                    </div>
                                    {watchProviders.flatrate && <h1>Subscription</h1>}
                                    <div className='flex h-fit p-1 flex-wrap'>
                                        {watchProviders.flatrate?.map(provider => {
                                            return (
                                                <img src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} className='rounded-2xl w-12 m-1'></img>
                                            )
                                        })}
                                    </div>
                                    {watchProviders.rent && <h1>Rent</h1>}
                                    <div className='flex h-fit p-1 flex-wrap'>
                                        {watchProviders.rent?.map(provider => {
                                            return (
                                                <img src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} className='rounded-2xl w-12 m-1'></img>
                                            )
                                        })}
                                    </div>
                                </div>
                                : <div>Loading</div>}
                            {/* <div className='bg-slate-800 p-5 h-fit'>
                            <p>{budget}, {}</p>
                        </div> */}
                        </div>
                    </div>
                    <div className='h-full w-full bg-'>
                        {credits ? <div className='flex justify-center'>
                            <div className='m-1'>
                                <h1 className='text-white text-2xl text-center'>Cast</h1>
                                {credits.cast.map(credit => {
                                    return (
                                        <div className='flex justify-start items-center p-3 bg-slate-800 text-white m-1 w-full hover:bg-slate-700 cursor-pointer'>
                                            {credit.profile_path ? <img src={`https://image.tmdb.org/t/p/original${credit.profile_path}`} className='w-12 rounded-3xl m-1'></img> : <></>}
                                            <div className='w-80'>
                                                <p>{credit.name}</p>
                                                <small className='break-normal text-slate-400'>{credit.character}</small>
                                            </div>

                                        </div>
                                    )
                                })}
                            </div>
                            <div className='m-1'>
                                <h1 className='text-white text-2xl text-center'>Crew</h1>
                                {credits.crew.map(credit => {
                                    return (
                                        <div className='flex justify-start items-center p-3 bg-slate-800 text-white m-1 w-full hover:bg-slate-700 cursor-pointer'>
                                            {/* {credit.profile_path ? <img src={`https://image.tmdb.org/t/p/original${credit.profile_path}`} className='w-12 rounded-3xl m-1'></img> : <></>} */}
                                            <div className='w-80'>
                                                <p>{credit.name}</p>
                                                <small className='break-normal text-slate-400'>{credit.job}</small>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                        </div> : <div>Nothing to display</div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Movie