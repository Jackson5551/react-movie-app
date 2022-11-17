import { useEffect, useState } from "react"

const useTMDB = ({category,url}) => {

    let base = 'https://api.themoviedb.org/3/'
    switch(category){
        case 'movie':
            base = base + 'movie/'
            break;
        default:
            break;
    }

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    const fetchApi = () => {
        fetch(url)
        .then((response)=>{
            return response.json()
        })
        .then((json)=>{
            console.log(json)
            setLoading(false)
            setData(json)
        })
    }

    useEffect(()=> {
        fetchApi();
    },[])

    return {loading, data}
}

export default useTMDB