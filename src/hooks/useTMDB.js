import { useEffect, useState } from "react"

const baseUrl = 'https://api.themoviedb.org/3/'
const baseUrlImgOriginal = ''
const baseUrlImageW500 = ''

const apiKey = process.env.REACT_APP_TMDB_API_KEY

const useTMDb = ({ what, states }) => {
    useEffect(()=>{
        what.forEach((url,i) => {
            fetch(`${baseUrl}${what}?api_key=${apiKey}&language=en-US`)
                .then((res) => res.json())
                .then((json) => { states[i](json); console.log(json) })
                i++
        });
    },[what, states])

}
export default useTMDb


// What will I need for this hook
// INPUTS
// - Array of things to fetch and what state to set