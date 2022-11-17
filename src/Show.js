import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const Show = () => {
    let { showId } = useParams()
  return (
    <div>{showId}</div>
  )
}

export default Show