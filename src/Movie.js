import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Movie = () => {
    const [movieData, setMovieData] = useState({})
    const [loading, setLoading] = useState(true)

    let { movieId } = useParams()
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
            .then((res) => res.json())
            .then((json) => { setMovieData(json); setLoading(false); console.log(json) })
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
    return (
        <div
            style={{
                'var(--image-url)': backdropImageUrl,
                'backgroundImage': `url(${backdropImageUrl})`
            }}
            className="bg-center bg-cover h-screen bg-no-repeat">
            <div className='h-screen w-screen backdrop-blur-lg bg-slate-800/50 p-3'>
                <div className='flex h-full w-full'>
                    <div>
                        {/* <p>{tagline}</p> */}
                        {/* <img src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                        className='rounded-3xl'></img> */}
                        <div
                            style={{
                                'backgroundImage': `url(${posterImageUrl})`
                            }}
                            className='w-96 h-2/3 bg-center bg-contain bg-no-repeat drop-shadow-2xl'>

                        </div>

                    </div>
                    <div className='flex-col ml-2 w-full'>
                        <div className='text-slate-400 bg-slate-800 p-5 h-fit mb-2'>
                            <span><h1 className="text-2xl text-white">{title}</h1><p className='italic'>{tagline}</p></span>
                            <p>{overview}</p>
                        </div>
                        {/* <div className='h-fit p-5 text-white'>
                            <h1>Watch</h1>
                        </div> */}
                        <div className='bg-slate-800 p-5 h-fit'>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movie