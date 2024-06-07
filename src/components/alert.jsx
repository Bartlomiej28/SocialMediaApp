import React from 'react'

function Alert({text}) {
  return (
    <section className='w-full h-screen absolute'>
      <div className='flex justify-center pt-10 ease-in-out delay-300 duration-300'>
        <div className=' bg-lime-500 animate-bounce flex flex-row gap-2 p-4 shadow-lg rounded-lg'>
            <div className=' bg-white flex justify-center items-center p-2 rounded-full'>
                <i className='bx bx-check bx-tada' color='green' ></i>
            </div>
            <p>{text}</p>
        </div>
      </div>
    </section>
  )
}

export default Alert