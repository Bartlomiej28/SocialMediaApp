import React, {useEffect, useState} from 'react'
import {Link, NavLink, useParams} from 'react-router-dom'
import {AiOutlineHome} from 'react-icons/ai';
import {IoPeopleOutline} from 'react-icons/io5';
import {RiAccountCircleLine , RiCompass3Line, RiAddBoxLine} from 'react-icons/ri';

function BottomBar() {
  const [place, setPlace] = useState();
  const params = useParams()

  useEffect(()=>{
    const currentPlace = window.location.href.split('/')[3];
    setPlace(currentPlace)
  },[params])


  return (
    <div className={`w-full h-full flex flex-row justify-between ${place == 'home' ? 'bg-black text-white' : 'bg-white text-black'} gap-2 p-4 z-50`}>
        
        <NavLink to='/home' className='gap-y-0 font-medium ' >
          <AiOutlineHome fontSize={25}/>
        </NavLink>

        <NavLink to='/following' className='font-medium '>
          <IoPeopleOutline fontSize={25}/>
        </NavLink>

        <NavLink to='/upload' className='font-medium ' >
          <RiAddBoxLine fontSize={30}/>
        </NavLink>

        <NavLink to='/explore' className='font-medium '>
          <RiCompass3Line fontSize={25}/>
        </NavLink>

        <NavLink to='/profile' className='font-medium ' >
          <RiAccountCircleLine fontSize={25}/>
        </NavLink>
    </div>
  )
}

export default BottomBar