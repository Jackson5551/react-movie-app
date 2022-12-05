import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import empty from '../img/empty.png'

const ResultCard = ({ result, category, img_path }) => {
    if (category === 'people') {
        return (
            <li className='m-3 box-border'>
                <Link to={`/${category}/${result.id}`}>
                    {img_path ? <PersonCard result={result} img_path={img_path}></PersonCard> : <EmptyCard result={result}></EmptyCard>}
                </Link>
            </li>
        )
    } else {

        return (
            <li className='m-3 box-border'>
                <Link to={`/${category}/${result.id}`}>
                    {img_path ? <FullCard result={result} img_path={img_path}></FullCard> : <EmptyCard result={result}></EmptyCard>}
                </Link>
            </li>
        )
    }
}

export const FullCard = ({ result, img_path }) => {
    const imgRef = useRef();
    const onImageError = () => imgRef.current.src = empty;
    return (
        <img src={`https://image.tmdb.org/t/p/w500${img_path}`}
            className='w-96 h-full min-h-[550px] max-h-full hover:shadow-2xl border-solid border-transparent border-2 hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 box-border hover:box-border rounded-2xl'
            ref={imgRef}
            alt={result.title || result.name}
            onError={onImageError}></img>
    )
}

export const EmptyCard = ({ result }) => {
    return (
        <div className='relative hover:shadow-2xl border-solid border-transparent border-2 hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 box-border hover:box-border rounded-2xl'>
            <img src={empty}
                className='w-96 h-full min-h-[550px] max-h-full rounded-2xl border-solid border-transparent border-2' alt={''}></img><p className='absolute text-3xl text-center text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6'>{result.title || result.name}</p></div>
    )
}

export const PersonCard = ({ result }) => {
    const imgRef = useRef();
    const onImageError = () => imgRef.current.src = empty;
    return (
        <>
            {result.profile_path ? <div className='relative hover:shadow-2xl border-solid border-transparent border-2 hover:shadow-white/50 hover:border-solid hover:border-white hover:border-2 box-border hover:box-border rounded-2xl'>
                <img src={`https://image.tmdb.org/t/p/w500${result.profile_path}`}
                    className='w-96 h-full min-h-[550px] max-h-full rounded-2xl border-solid border-transparent border-2'
                    alt={result.name} onError={onImageError}></img> <p className='absolute text-3xl text-center text-white top-3/4 left-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 bg-slate-800/95 p-6 rounded-xl'>{result.name}</p></div>
                : <EmptyCard result={result}></EmptyCard>}
        </>
    )
}

export default ResultCard