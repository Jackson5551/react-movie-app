import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Show = () => {
  const [showData, setShowData] = useState({})
  const [watchProviders, setWatchProviders] = useState()
  const [credits, setCredits] = useState()
  const [loading, setLoading] = useState(true)

  let { showId } = useParams()
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${showId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((json) => { setShowData(json); setLoading(false); console.log(json) })
    fetch(`https://api.themoviedb.org/3/tv/${showId}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&locale=US`)
      .then((res) => res.json())
      .then((json) => { setWatchProviders(json.results.US); console.log(json.results.US) })
    fetch(`https://api.themoviedb.org/3/tv/${showId}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&locale=US`)
      .then((res) => res.json())
      .then((json) => { setCredits(json); console.log(json) })
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
  return (
    <div
      style={{
        'var(--image-url)': backdropImageUrl,
        'backgroundImage': `url(${backdropImageUrl})`,
        'backgroundAttachment': 'fixed'
      }}
      className="w-full h-full bg-center bg-cover bg-no-repeat bg-fixed">
      <div className='backdrop-blur-lg bg-slate-800/50 p-3 h-full'>
        <div className='flex w-full min-h-[50vh]'>
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
              <span><h1 className="text-4xl text-white">{name}</h1><p className='italic'>{tagline}</p></span>
              {/* <p>{release_date}</p> */}
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
          </div>
        </div>
        <div className='h-full w-full bg-'>
          {seasons ? <div className='flex justify-center'>
            <div className='m-1'>
              <h1 className='text-white'>Seasons</h1>
              {seasons.map(season=>{
                return(
                  <div>
                    {season.season_number}
                  </div>
                )
              })}
            </div>
          </div> : <div>Nothing to display</div>}
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

export default Show