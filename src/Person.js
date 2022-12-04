import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import Loading from './Loading'

const Person = () => {
    const [personData, setPersonData] = useState({})
    const [credits, setCredits] = useState(null)
    const [loading, setLoading] = useState(true)
    let { personId } = useParams()

    useEffect(() => {
        setLoading(true)
        fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
            .then((res) => res.json())
            .then((json) => { setPersonData(json); console.log(json) })
        fetch(`https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
            .then((res) => res.json())
            .then((json) => { setCredits(json); setLoading(false); console.log(json) })
    }, [personId])

    const {
        birthday,
        known_for_department,
        deathday,
        id,
        name,
        also_known_as,
        gender,
        biography,
        popularity,
        place_of_birth,
        profile_path,
        adult,
        imdb_id,
        homepage
    } = personData
    let backdropImageUrl = `https://image.tmdb.org/t/p/original${credits?.cast[0]?.backdrop_path}`

    const filterRoles = (roles) =>{
        let filtered = []
        let ids = []
        roles.forEach(role =>{
            if(!ids.includes(role.id)){
                ids.push(role.id)
                filtered.push(role)
            }
        })
        console.log(filtered)
        return filtered
    }
    let formatted_birthday = new Date(birthday)
    const current_age = (bday) => {
        let now = new Date()
        let then = new Date(bday)
        let age = now.getFullYear() - then.getFullYear()
        if(then.getMonth() >= now.getMonth()) {
            if(then.getDate() > now.getDate()) return age - 1
        }
        return age
    }
    document.title = personData.name ? personData.name : 'Loading Person...'

    if (loading) {
        return <Loading></Loading>
    } else {
        return (
            <>
                <Navbar></Navbar>
                <div className='bg-gradient-to-r from-cyan-500 to-blue-500'>
                    <div
                        style={{
                            'var(--image-url)': backdropImageUrl,
                            'backgroundImage': `url(${backdropImageUrl && backdropImageUrl})`,
                            'backgroundAttachment': 'fixed'
                        }}
                        className="w-full h-full bg-center bg-cover bg-no-repeat bg-fixed">
                        <div className='backdrop-blur-lg bg-slate-800/50 p-2 h-full min-h-screen'>
                            <div className='flex h-full w-full min-h-[50vh] max-md:flex-col max-md:items-center'>
                                {profile_path && 
                                <div className='max-md:m-5'>
                                    {/* <p>{tagline}</p> */}
                                    <img src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                                        className='rounded-2xl min-w-96'></img>
                                </div>}
                                <div className={`flex-col w-full ${profile_path ? 'ml-2' : ''} max-sm:ml-0`}>
                                    <div className='text-slate-400 bg-slate-800 p-5 h-fit mb-2 rounded-2xl'>
                                        <span><a href={homepage} target='_blank'><h1 className="text-4xl text-white hover:text-blue-600">{name}</h1></a><p className='italic'>{known_for_department}</p></span>
                                        {/* <p>{release_date}</p> */}
                                        <p>{biography}</p>
                                    </div>
                                    <div className='flex justify-between'>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center mt-2'>
                                <div className='bg-slate-800 rounded-xl w-full p-5 flex justify-around text-slate-400 max-sm:flex-col'>
                                    <div className='flex flex-col text-center'>
                                        <span className='text-white text-lg'>Birthday</span>
                                        
                                            {!deathday ? 
                                            <span className='text-sm'>
                                                {formatted_birthday.toDateString()} ({current_age(birthday)} years)</span> 
                                                : <span className='text-sm'>{formatted_birthday.toDateString()}</span>}
                                    </div>
                                    <div className='flex flex-col text-center'>
                                        <span className='text-white text-lg'>Place of Birth</span>
                                        <span className='text-sm'>{place_of_birth ? place_of_birth : '-'}</span>
                                    </div>
                                    <div className='flex flex-col text-center'>
                                        <span className='text-white text-lg'>Gender</span>
                                        <span className='text-sm'>{gender === 1 ? 'Female' : gender === 2 ? 'Male' : !gender ? '-' : 'Other'}</span>
                                    </div>
                                    <div className='flex flex-col text-center'>
                                        <span className='text-white text-lg'>Died</span>
                                        <span className='text-sm'>{deathday ? deathday : '-'}</span>
                                    </div>
                                </div>
                            </div>
                            {credits && credits.cast.length > 0 && 
                            <div className='flex justify-center mt-2'>
                                <div className='bg-slate-800 rounded-xl w-full p-5 text-white text-center text-lg'>
                                    <span>Appears in:</span>
                                    <div className='flex justify-center flex-wrap'>
                                        {credits && <>
                                        
                                            {filterRoles(credits.cast).map((role)=>{
                                                if (role.poster_path){
                                                    if(role.media_type === 'movie'){
                                                        return (
                                                            <div className='m-1'>
                                                                <Link to={`/movies/${role.id}`}>
                                                                    <img title={`${role.title}`} src={`https://image.tmdb.org/t/p/w500${role.poster_path}`}
                                                                        className='w-28 rounded-xl min-h-full border-solid border-2 border-transparent hover:border-white'></img>
                                                                </Link>
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            <div className='m-1'>
                                                                <Link to={`/tvshows/${role.id}`}>
                                                                    <img title={`${role.name}`} src={`https://image.tmdb.org/t/p/w500${role.poster_path}`}
                                                                        className='w-28 rounded-xl min-h-full border-solid border-2 border-transparent hover:border-white'></img>
                                                                </Link>
                                                            </div>
                                                        )
                                                    }
                                                    
                                                }
                                            })}
                                        </>}
                                    </div>

                                </div>
                            </div>}
                            {credits && credits.crew.length > 0 &&
                            <div className='flex justify-center mt-2'>
                                <div className='bg-slate-800 rounded-xl w-full p-5 text-white text-center text-lg'>
                                    <span>On the Crew of:</span>
                                    <div className='flex justify-center flex-wrap'>
                                        {credits && <>

                                            {filterRoles(credits.crew).map((role) => {
                                                if (role.poster_path) {
                                                    if (role.media_type === 'movie') {
                                                        return (
                                                            <div className='m-1'>
                                                                <Link to={`/movies/${role.id}`}>
                                                                    <img title={`${role.title}`} src={`https://image.tmdb.org/t/p/w500${role.poster_path}`}
                                                                        className='w-28 rounded-xl min-h-full border-solid border-2 border-transparent hover:border-white'></img>
                                                                </Link>
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            <div className='m-1'>
                                                                <Link to={`/tvshows/${role.id}`}>
                                                                    <img title={`${role.name}`} src={`https://image.tmdb.org/t/p/w500${role.poster_path}`}
                                                                        className='w-28 rounded-xl min-h-full border-solid border-2 border-transparent hover:border-white'></img>
                                                                </Link>
                                                            </div>
                                                        )
                                                    }

                                                }
                                            })}
                                        </>}
                                    </div>

                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Person