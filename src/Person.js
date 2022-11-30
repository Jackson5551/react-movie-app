import React from 'react'
import { useParams } from 'react-router-dom'

const Person = () => {
    let { personId } = useParams()
  return (
    <div>{personId}</div>
  )
}

export default Person