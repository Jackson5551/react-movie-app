import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LocationContext } from './context/LocationContext'
import useTimeConvert from './hooks/useTimeConvert'
import Loading from './Loading'
import { formatTime } from './helpers/formatTime'
import { formatCurrency } from './helpers/formatCurrency'
import Navbar from './components/Navbar'

const Movie = () => {
    const [movieData, setMovieData] = useState({})
    const [contentRatings, setContentRatings] = useState(null)
    const [watchProviders, setWatchProviders] = useState(null)
    const [recommendations, setRecommendations] = useState(null)
    const [credits, setCredits] = useState(null)
    const [loading, setLoading] = useState(true)

    let { movieId } = useParams()

    useEffect(() => {
        setLoading(true)
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
            .then((res) => res.json())
            .then((json) => { setMovieData(json); console.log(json) })
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
            .then((res) => res.json())
            .then((json) => { setContentRatings(json.results); console.log(json.results) })
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&locale=US`)
            .then((res) => res.json())
            .then((json) => { setWatchProviders(json.results.US); console.log(json.results.US) })
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&locale=US`)
            .then((res) => res.json())
            .then((json) => { setRecommendations(json.results); console.log(json.results) })
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&locale=US`)
            .then((res) => res.json())
            .then((json) => { setCredits(json); setLoading(false); console.log(json) })

    }, [movieId])
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
    let backdropImageUrl = `https://image.tmdb.org/t/p/original${backdrop_path && backdrop_path}`
    let posterImageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`

    let releaseDateFormatted = new Date(release_date)

    const location = useContext(LocationContext)

    const [counter, setCounter] = useState(0)

    document.title = movieData.title ? movieData.title : 'Loading Movie...'
    if (loading) {
        return (<Loading></Loading>)
    } else {
        return (
            <>
                <Navbar></Navbar>
                <div className='bg-gradient-to-r from-cyan-500 to-blue-500'>
                    <div
                        style={{
                            'var(--image-url)': backdropImageUrl,
                            'backgroundImage': `url(${backdropImageUrl})`,
                            'backgroundAttachment': 'fixed'
                        }}
                        className="w-full h-full bg-center bg-cover bg-no-repeat bg-fixed">
                        <div className='backdrop-blur-lg bg-slate-800/50 p-2 h-full min-h-screen'>
                            <div className='flex h-full w-full min-h-[50vh] max-md:flex-col max-md:items-center'>
                                {poster_path && 
                                <div className='max-md:m-5'>
                                    {/* <p>{tagline}</p> */}
                                    <img src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                                        className='rounded-2xl min-w-96'></img>
                                </div>}
                                <div className={`flex-col w-full ${poster_path ? 'ml-2' : ''} max-sm:ml-0`}>
                                    <div className='text-slate-400 bg-slate-800 p-5 h-fit mb-2 rounded-2xl'>
                                        <span><a href={homepage} target='_blank'><h1 className="text-4xl text-white hover:text-blue-600">{title} ({release_date ? releaseDateFormatted.getFullYear(): 'N/A'})</h1></a><p className='italic'>{tagline}</p></span>
                                        {/* <p>{release_date}</p> */}
                                        <div className='flex items-center text-slate-500'>

                                            {contentRatings && contentRatings.map(rating => {
                                                try {
                                                    if (rating.iso_3166_1 === location) {
                                                        if (rating.release_dates[counter].certification) {
                                                            if (rating.release_dates[counter].certification !== '' || rating.release_dates[counter].certification !== undefined) {
                                                                return (rating.release_dates[counter].certification
                                                                    ? <p className='text-xs border-2 border-yellow-500 p-1 text-yellow-500 w-fit mt-1 mb-1'>{rating.release_dates[counter].certification}</p>
                                                                    : <p className='text-xs border-2 border-yellow-500 p-1 text-yellow-500 w-fit mt-1 mb-1'>N/A</p>)
                                                            }
                                                            else {
                                                                setCounter(counter + 1)
                                                            }
                                                        } else {
                                                            setCounter(counter + 1)
                                                        }
                                                    }
                                                } catch (e) {

                                                }
                                            })}
                                            <p className='p-1 pl-2'> &bull; </p>
                                            <p className=''>{formatTime(runtime)}</p>
                                            <p className='p-1'> &bull; </p>
                                            <p className=''>
                                                {genres && genres.map((genre, index) => {
                                                    return (<Link>{`${index ? ', ' : ''}`}<span className='hover:text-blue-600'>{genre.name}</span></Link>)
                                                })}
                                            </p>
                                        </div>
                                        <p>{overview}</p>
                                        {production_companies && production_companies.length >= 1 && <div className='text-xs mt-5'>
                                            <p>
                                                <span className='text-white'>Producers:</span>
                                                {production_companies.map((company, index) => {
                                                    return (
                                                        <span> {`${index ? ', ' : ''}`}{company.name}</span>
                                                    )
                                                })}
                                            </p>
                                        </div>}
                                    </div>
                                    <div className='flex justify-between'>
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
                                            : <div className='text-white flex justify-center items-center w-full h-full'>No watch providers available</div>}
                                    </div>
                                    {/* <div className='bg-slate-800 p-5 h-fit'>
                            <p>{budget}, {}</p>
                        </div> */}
                                </div>
                            </div>
                            <div className='flex justify-center mt-2'>
                                <div className='bg-slate-800 rounded-xl w-full p-5 flex justify-around text-slate-400 max-sm:flex-col'>
                                    <div className='flex flex-col text-center'>
                                        <span className='text-white text-lg'>Status</span>
                                        <span className='text-sm'>{status ? status : '-'}</span>
                                    </div>
                                    <div className='flex flex-col text-center'>
                                        <span className='text-white text-lg'>Original Language</span>
                                        <span className='text-sm'>{original_language ? original_language : '-'}</span>
                                    </div>
                                    <div className='flex flex-col text-center'>
                                        <span className='text-white text-lg'>Budget</span>
                                        <span className='text-sm'>{budget === 0 || budget === null || budget === undefined ? '-' : formatCurrency.format(budget)}</span>
                                    </div>
                                    <div className='flex flex-col text-center'>
                                        <span className='text-white text-lg'>Revenue</span>
                                        <span className='text-sm'>{revenue === 0 || revenue === null || revenue === undefined ? '-' : formatCurrency.format(revenue)}</span>
                                    </div>
                                </div>
                            </div>
                            {recommendations && recommendations.length > 0 && 
                            <div className='flex justify-center mt-2'>
                                <div className='bg-slate-800 rounded-xl w-full p-5 text-white text-center text-lg'>
                                    <span>You might also be interested in...</span>
                                    <div className='flex justify-center flex-wrap'>
                                        {recommendations && recommendations.map(recommendation => {
                                            if(recommendation.poster_path){
                                            return (
                                                <div className='m-1'>
                                                    <Link to={`/movies/${recommendation.id}`}>
                                                        <img title={`${recommendation.title}`} src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
                                                            className='w-28 rounded-xl min-h-full border-solid border-2 border-transparent hover:border-white'></img>
                                                    </Link>
                                                </div>
                                            )}
                                        })}
                                    </div>

                                </div>
                            </div>}
                            <div className='h-full w-full'>
                                {credits ? <div className='flex justify-center max-md:flex-col'>
                                    <div className='m-1'>
                                        {credits.cast.length > 0 && <h1 className='text-white text-2xl text-center'>Cast</h1>}
                                        {credits.cast.length > 0 && credits.cast.map(credit => {
                                            return (
                                                <Link to={`/people/${credit.id}`}>
                                                    <div className='flex justify-start items-center p-3 bg-slate-800 text-white m-1 w-full hover:bg-slate-700 cursor-pointer rounded-2xl'>
                                                        {credit.profile_path ? <img src={`https://image.tmdb.org/t/p/original${credit.profile_path}`} className='w-12 rounded-xl m-1 mr-3'></img> : <></>}
                                                        <div className='w-80'>
                                                            <p>{credit.name}</p>
                                                            <small className='break-normal text-slate-400'>{credit.character}</small>
                                                        </div>

                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                    <div className='m-1'>
                                        {credits.crew.length > 0 && <h1 className='text-white text-2xl text-center'>Crew</h1>}
                                        {credits.crew.length > 0 && credits.crew.map(credit => {
                                            return (
                                                <Link to={`/people/${credit.id}`}>
                                                    <div className='flex justify-start items-center p-3 bg-slate-800 text-white m-1 w-full hover:bg-slate-700 cursor-pointer rounded-xl'>
                                                        {/* {credit.profile_path ? <img src={`https://image.tmdb.org/t/p/original${credit.profile_path}`} className='w-12 rounded-3xl m-1'></img> : <></>} */}
                                                        <div className='w-80'>
                                                            <p>{credit.name}</p>
                                                            <small className='break-normal text-slate-400'>{credit.job}</small>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    </div>

                                </div> : <div></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Movie