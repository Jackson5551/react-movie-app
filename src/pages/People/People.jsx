import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Loading from '../../Loading'
import ResultCard from '../../components/ResultCard'

const People = () => {
    const [popularPeople, setPopularPeople] = useState([])
    const [loading, setLoading] = useState(true)

    const api_key = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        setLoading(true)
        fetch(`https://api.themoviedb.org/3/person/popular?api_key=${api_key}&language=en-US`)
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
                <div className='w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500'>
                    <div className='min-w-full min-h-full bg-slate-800/90'>
                        <div
                            className='flex justify-center'>
                            <h1 className='text-white text-2xl p-2'>Today's Top Actors</h1>
                        </div>
                        <ul className='flex flex-wrap justify-center box-border'>
                            {popularPeople.results.map(person => {
                                return (
                                    <ResultCard
                                        result={person}
                                        category={'people'}
                                        img_path={person.profile_path} />
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}

export default People