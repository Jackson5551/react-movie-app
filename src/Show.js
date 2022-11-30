import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LocationContext } from './context/LocationContext'
import Loading from './Loading'
import { formatTime } from './helpers/formatTime'
import { formatCurrency } from './helpers/formatCurrency'

const Show = () => {
  const [showData, setShowData] = useState({})
  const [watchProviders, setWatchProviders] = useState(null)
  const [contentRatings, setContentRatings] = useState(null)
  const [credits, setCredits] = useState(null)
  const [loading, setLoading] = useState(true)

  let { showId } = useParams()

  const location = useContext(LocationContext)

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${showId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((json) => { setShowData(json); console.log(json) })
    fetch(`https://api.themoviedb.org/3/tv/${showId}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&locale=US`)
      .then((res) => res.json())
      .then((json) => { setWatchProviders(json.results.US); console.log(json.results.US) })
    fetch(`https://api.themoviedb.org/3/tv/${showId}/content_ratings?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&locale=US`)
      .then((res) => res.json())
      .then((json) => { setContentRatings(json.results); console.log(json.results) })
    fetch(`https://api.themoviedb.org/3/tv/${showId}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&locale=US`)
      .then((res) => res.json())
      .then((json) => { setCredits(json); setLoading(false); console.log(json) })
  }, [])

  const {
    backdrop_path,
    created_by,
    episode_run_time,
    first_air_data,
    genres,
    homepage,
    id,
    in_production,
    languages,
    last_air_date,
    last_episode_to_air,
    name,
    next_episode_to_air,
    networks,
    number_of_episodes,
    number_of_seasons,
    orgin_country,
    original_language,
    original_name,
    overview,
    popularity,
    poster_path,
    production_companies,
    production_countries,
    seasons,
    spoken_languages,
    status,
    tagline,
  } = showData
  let backdropImageUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`
  let posterImageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`
  if (loading) {
    return (
      <Loading></Loading>
    )
  } else {
    return (
      <div
        style={{
          'var(--image-url)': backdropImageUrl,
          'backgroundImage': `url(${backdropImageUrl})`,
          'backgroundAttachment': 'fixed'
        }}
        className="w-full h-full bg-center bg-cover bg-no-repeat bg-fixed">
        <div className='backdrop-blur-lg bg-slate-800/50 p-3 h-full min-h-screen'>
          <div className='flex w-full min-h-[50vh]'>
            <div className=''>
              {/* <p>{tagline}</p> */}
              <img src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                className='rounded-2xl min-w-96 h-full'></img>
              {/* <div
                style={{
                  'backgroundImage': `url(${posterImageUrl})`
                }}
                className='w-96 h-full bg-center bg-contain bg-no-repeat drop-shadow-2xl'>

              </div> */}

            </div>
            <div className='flex-col ml-2 w-full'>
              <div className='text-slate-400 bg-slate-800 p-5 h-fit mb-2 rounded-2xl'>
                <span><a href={homepage} target='_blank'><h1 className="text-4xl text-white hover:text-blue-600">{name}</h1></a><p className='italic'>{tagline}</p></span>
                {/* <p>{release_date}</p> */}
                <div className='flex items-center text-slate-500'>
                  {contentRatings && contentRatings.map(rating => {
                    if (rating.iso_3166_1 === location) return <p className='text-xs border-2 border-yellow-500 p-1 text-yellow-500 w-fit mt-1 mb-1'>{rating.rating}</p>
                  })}
                  <p className='p-1 pl-2'> &bull; </p>
                  <p className=''>{number_of_episodes} Episodes</p>
                  <p className='p-1'> &bull; </p>
                  <p className=''>{number_of_seasons} {number_of_seasons <= 1 ? 'Season' : 'Seasons'}</p>
                  <p className='p-1'> &bull; </p>
                  <p className=''>
                    {genres.map((genre, index) => {
                      return <Link className=''>{`${index ? ', ' : ''}`}<span className='hover:text-blue-600'>{genre.name}</span></Link>
                    })}
                  </p>
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
                : <div className='text-white'>No watch providers available</div>}
            </div>
          </div>
          <div className='h-full w-full bg-'>
            {seasons ? <div className='flex justify-center text-center bg-slate-800/50 m-2'>
              <div className='m-1'>
                <h1 className='text-white'>Seasons</h1>
                <div className='flex flex-wrap justify-center'>
                  {seasons.map(season => {
                    return (
                      <div className='m-1 p-1 flex-col text-white'>
                        <p>Season {season.season_number}</p>
                        {season.poster_path && <img alt={`Season ${season.season_number}`} src={`https://image.tmdb.org/t/p/original${season.poster_path}`} className='w-32'></img>}
                        <p>{season.episode_count} Episodes</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div> : <div>Nothing to display</div>}
            {credits ? <div className='flex justify-center'>
              <div className='m-1'>
                {credits.cast.length > 0 && <h1 className='text-white text-2xl text-center'>Cast</h1>}
                {credits.cast.map(credit => {
                  return (
                    <div className='flex justify-start items-center p-3 bg-slate-800 text-white m-1 w-full hover:bg-slate-700 cursor-pointer rounded-2xl'>
                      {credit.profile_path ? <img src={`https://image.tmdb.org/t/p/original${credit.profile_path}`} className='w-12 rounded-xl m-1 mr-3'></img> : <></>}
                      <div className='w-80'>
                        <p>{credit.name}</p>
                        <small className='break-normal text-slate-400'>{credit.character}</small>
                      </div>

                    </div>
                  )
                })}
              </div>
              <div className='m-1'>
                {credits.crew.length > 0 && <h1 className='text-white text-2xl text-center'>Crew</h1>}
                {credits.crew.map(credit => {
                  return (
                    <div className='flex justify-start items-center p-3 bg-slate-800 text-white m-1 w-full hover:bg-slate-700 cursor-pointer rounded-2xl'>
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
            {/* <div className='flex flex-wrap'>
            {seasons && seasons.map(season=>{
              return(
                season.poster_path && <img src={`https://image.tmdb.org/t/p/original${season.poster_path}`} className='w-60 flex-wrap'></img>
              )
            })}
          </div> */}

          </div>
        </div>
      </div>
    )
  }
}

export default Show