import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import Loading from './Loading'

const Collection = () => {
  const [collectionData, setCollectionData] = useState({})
  const [loading, setLoading] = useState(true)
  const { collectionId } = useParams()

  useEffect(() => {
    setLoading(true)
    fetch(`https://api.themoviedb.org/3/collection/${collectionId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((json) => { setCollectionData(json); setLoading(false); console.log(json) })
  }, [collectionId])

  const {
    id,
    name,
    overview,
    poster_path,
    backdrop_path,
    parts
  } = collectionData
  let backdropImageUrl = `https://image.tmdb.org/t/p/original${backdrop_path && backdrop_path}`


  document.title = collectionData.name ? collectionData.name : 'Loading Movie...'

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
                    <span><h1 className="text-4xl text-white hover:text-blue-600">{name}</h1></span>
                    {/* <p>{release_date}</p> */}
                    <p>{overview}</p>
                  </div>
                  <div className='flex flex-col justify-center'>
                    {parts && parts.map(part => {
                      return (
                        <Link to={`/movies/${part.id}`}>
                          <div className='flex justify-start items-center p-4 bg-slate-800 text-white mb-1 w-full hover:bg-slate-700 cursor-pointer rounded-2xl'>
                            {part.poster_path ? <img src={`https://image.tmdb.org/t/p/original${part.poster_path}`} className='w-32 rounded-xl m-1 mr-3'></img> : <></>}
                            <div className=''>
                              <p className='text-3xl'>{part.name || part.title}</p>
                              <small className='break-normal text-slate-400 text-lg'>{part.overview}</small>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

}

export default Collection