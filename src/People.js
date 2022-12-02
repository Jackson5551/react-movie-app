import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Loading from './Loading'

const People = () => {
    const [popularPeople, setPopularPeople] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
            .then((res) => res.json())
            .then((json) => { setPopularPeople(json); console.log(json); setLoading(false) })
    }, [])
    document.title = "Top People"
    if (loading) {
        return (<Loading></Loading>)
    } else {
        return (
            <>
                <Navbar></Navbar>
                <div className='w-full h-full bg-gradient-to-r from-[#01b4e4] to-[#90cea1]'>
                    <div className='min-w-full min-h-full bg-slate-800/90'>
                        <div
                            className='flex justify-center'>
                            <h1 className='text-white text-2xl p-2'>Today's Top Actors</h1>
                        </div>
                        <ul className='flex flex-wrap justify-center box-border'>
                            {popularPeople.results.map(person => {
                                let imgUrl = `https://image.tmdb.org/t/p/original${person.profile_path}`

                                return (
                                    <li className='m-3 box-border'>
                                        <Link to={`/people/${person.id}`}>
                                            {person.profile_path ? <div className='relative hover:shadow-2xl border-solid border-transparent border-2 hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 box-border hover:box-border rounded-2xl'> <img
                                                src={imgUrl}
                                                title={person.name}
                                                className='w-96 h-full min-h-[550px] max-h-full rounded-2xl border-solid border-transparent border-2'
                                                alt={person.name}>
                                                </img> <p
                                                    className='absolute text-3xl text-center text-white top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-600/90 p-6 rounded-xl'>{person.name}</p></div> : <div className='flex justify-center items-center w-96 bg-slate-600 h-full text-white border-solid border-transparent border-2 hover:shadow-2xl hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 box-border hover:box-border rounded-2xl'><p>{person.name}</p></div>}
                                        </Link>
                                    </li>)
                            })}
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}

export default People