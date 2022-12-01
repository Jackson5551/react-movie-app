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

    if (loading) {
        return (<Loading></Loading>)
    } else {
        return (
            <>
                <Navbar></Navbar>
                <div className='min-w-full min-h-full bg-slate-800'>
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
                                        {person.profile_path ? <img
                                            src={imgUrl}
                                            title={person.name}
                                            className='w-96 h-full min-h-[550px] max-h-full hover:shadow-2xl border-solid border-transparent border-2 hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 box-border hover:box-border rounded-2xl'
                                            alt={person.name}></img> : <div className='flex justify-center items-center w-96 bg-slate-600 h-full text-white border-solid border-transparent border-2 hover:shadow-2xl hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 box-border hover:box-border rounded-2xl'><p>{person.name}</p></div>}
                                    </Link>
                                </li>)
                        })}
                    </ul>
                </div>
            </>
        )
    }
}

export default People