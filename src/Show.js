import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LocationContext } from './context/LocationContext'
import Loading from './Loading'
import { formatTime } from './helpers/formatTime'
import { formatCurrency } from './helpers/formatCurrency'
import Navbar from './components/Navbar'

const Show = () => {
  const [showData, setShowData] = useState({})
  const [watchProviders, setWatchProviders] = useState(null)
  const [contentRatings, setContentRatings] = useState(null)
  const [recommendations, setRecommendations] = useState(null)
  const [credits, setCredits] = useState(null)
  const [loading, setLoading] = useState(true)

  let { showId } = useParams()

  const location = useContext(LocationContext)

  useEffect(() => {
    setLoading(true)
    fetch(`https://api.themoviedb.org/3/tv/${showId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((json) => { setShowData(json); console.log(json) })
    fetch(`https://api.themoviedb.org/3/tv/${showId}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&locale=US`)
      .then((res) => res.json())
      .then((json) => { setWatchProviders(json.results.US); console.log(json.results.US) })
    fetch(`https://api.themoviedb.org/3/tv/${showId}/content_ratings?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&locale=US`)
      .then((res) => res.json())
      .then((json) => { setContentRatings(json.results); console.log(json.results) })
    fetch(`https://api.themoviedb.org/3/tv/${showId}/recommendations?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&locale=US`)
      .then((res) => res.json())
      .then((json) => { setRecommendations(json.results); console.log(json.results) })
    fetch(`https://api.themoviedb.org/3/tv/${showId}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&locale=US`)
      .then((res) => res.json())
      .then((json) => { setCredits(json); setLoading(false); console.log(json) })
  }, [showId])

  const {
    backdrop_path,
    created_by,
    episode_run_time,
    first_air_date,
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

  document.title = showData.name ? showData.name : 'Loading Movie'

  if (loading) {
    return (
      <Loading></Loading>
    )
  } else {
    return (
      <>
      <Navbar></Navbar>
        <div
          style={{
            'var(--image-url)': backdropImageUrl,
            'backgroundImage': `url(${backdropImageUrl})`,
            'backgroundAttachment': 'fixed'
          }}
          className="w-full h-full bg-center bg-cover bg-no-repeat bg-fixed">
          <div className='backdrop-blur-lg bg-slate-800/50 p-3 h-full min-h-screen'>
            <div className='flex w-full min-h-[50vh] max-md:flex-col max-md:items-center'>
              <div className='max-md:m-5'>
                {/* <p>{tagline}</p> */}
                <img src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  className='rounded-2xl min-w-96'></img>
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
                      if (rating.iso_3166_1 === location) return <p className='text-xs border-2 border-yellow-500 p-1 text-yellow-500 w-fit mt-1 mb-1'>{rating.rating ? rating.rating : 'N/A'}</p>
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
                  {production_companies.length >= 1 && <div className='text-xs mt-5'>
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
                {watchProviders ?
                  <div className='h-fit p-5 text-white flex-col'>
                    {networks && <><h1>Networks</h1><div className='flex h-fit p-1 flex-wrap'>
                      {networks.map(network => {
                        return (
                          <img src={`https://image.tmdb.org/t/p/original${network.logo_path}`} className='h-6 m-1'></img>
                        )
                      })}
                    </div></>}
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
              {/* {seasons ? <div className='flex justify-center text-center bg-slate-800/50 m-2'>
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
            </div> : <div>Nothing to display</div>} */}
              <div className='flex justify-center mt-2'>
                <div className='bg-slate-800 rounded-2xl w-full p-5 flex justify-around text-slate-400 max-sm:flex-col'>
                  <div className='flex flex-col text-center'>
                    <span className='text-white text-lg'>Status</span>
                    <span className='text-sm'>{status}</span>
                  </div>
                  <div className='flex flex-col text-center'>
                    <span className='text-white text-lg'>Original Language</span>
                    <span className='text-sm'>{original_language}</span>
                  </div>
                  <div className='flex flex-col text-center'>
                    <span className='text-white text-lg'>First Aired</span>
                    <span className='text-sm'>{first_air_date}</span>
                  </div>
                  <div className='flex flex-col text-center'>
                    {!next_episode_to_air ?
                      <><span className='text-white text-lg'>Last Episode</span><span>"{last_episode_to_air?.name}" on {last_episode_to_air?.air_date}</span></>
                      :
                      <><span className='text-white text-lg'>Next Episode</span><span className='text-sm'>"{next_episode_to_air?.name}" on {next_episode_to_air?.air_date}</span></>
                    }
                  </div>
                </div>
              </div>
              <div className='flex justify-center mt-2'>
                <div className='bg-slate-800 rounded-2xl w-full h-full p-5 text-white text-center text-sm'>
                  <span className='text-2xl'>Seasons</span>
                  <div className='flex justify-center flex-wrap'>
                    {seasons && seasons.map(season => {
                      return (
                        season.season_number !== 0 &&
                        <div className='m-1 h-full'>
                          {season.season_number === 0 ? <span>Special Features</span> : <span>Season {season.season_number}</span>}
                          {season.poster_path ? <img title={`Season ${season.season_number}`} src={`https://image.tmdb.org/t/p/original${season.poster_path}`}
                            className='w-32 rounded-xl min-h-full'></img> : <img title={`Season ${season.season_number}`} src={`https://image.tmdb.org/t/p/original${poster_path}`}
                              className='w-32 rounded-xl min-h-full'></img>}
                          <span>{season.episode_count} Episodes</span>
                        </div>
                      )
                    })}
                  </div>

                </div>
              </div>
              <div className='flex justify-center mt-2'>
                <div className='bg-slate-800 rounded-2xl w-full p-5 text-white text-center text-lg'>
                  <span>You might also be interested in...</span>
                  <div className='flex justify-center flex-wrap'>
                    {recommendations && recommendations.map(recommendation => {
                      return (
                        <div className='m-1'>
                          <Link to={`/tvshows/${recommendation.id}`}>
                            <img title={`${recommendation.name}`} src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
                              className='w-28 rounded-xl min-h-full border-solid border-2 border-transparent hover:border-white'></img>
                          </Link>
                        </div>
                      )
                    })}
                  </div>

                </div>
              </div>
              {credits ? <div className='flex justify-center max-md:flex-col'>
                <div className='m-1'>
                  {credits.cast.length > 0 && <h1 className='text-white text-2xl text-center'>Cast</h1>}
                  {credits.cast.map(credit => {
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
                  {credits.crew.map(credit => {
                    return (
                      <Link to={`/people/${credit.id}`}>
                        <div className='flex justify-start items-center p-3 bg-slate-800 text-white m-1 w-full hover:bg-slate-700 cursor-pointer rounded-2xl'>
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
      </>
    )
  }
}

export default Show