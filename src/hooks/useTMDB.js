import { useEffect, useState } from "react"

const useTMDB = (type, query) => {
    const [data, setData] = useState(null)
    const url = `https://api.themoviedb.org/3/${type}/${query}`
    
    useEffect(()=>{
        fetch(url)
            .then((res) => res.json())
            .then((json) => {setData(json)})
    })

    return [data]
}
export default useTMDB