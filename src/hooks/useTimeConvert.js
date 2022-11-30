import React from 'react'

const useTimeConvert = ({num}) => {
    let hours = Math.floor(num / 60);
    let minutes = num % 60;
    let formattedRuntime = hours + ":" + minutes;  
    return hours + ":" + minutes;  
}

export default useTimeConvert