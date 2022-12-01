import React from 'react'

const Loading = () => {
  document.title = "Loading..."
  return (
    <div
    className='flex justify-center items-center bg-slate-800 text-white h-screen w-screen'>
        <h1 className='text-2xl'>Loading...</h1>
    </div>
  )
}

export default Loading