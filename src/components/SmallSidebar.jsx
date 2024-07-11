import React from 'react'
import {AiOutlineHome} from 'react-icons/ai';
import {IoPeopleOutline} from 'react-icons/io5';
import {RiLiveLine, RiCompass3Line} from 'react-icons/ri';
import {NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {AiOutlinePlus} from 'react-icons/ai';


function SmallSidebar({setShowSmallSidebar}) {
    const userName = useSelector(state => state.userData.displayName);
    const photoURL = useSelector((state) => state.userData.photoURL);
    
    const handleHideSidebar = () =>{
        setShowSmallSidebar(false);
    }

  return (
    <div className='absolute top-16 left-0 bg-black bg-opacity-50 h-sidebar-height w-full'>
        <div className=' bg-white h-full w-1/2 float-right p-4 flex flex-col gap-4'>
            <div className='flex flex-col gap-4 pb-4 border-0 border-b'>
                <Link className='w-full flex flex-row items-center gap-2 hover:scale-110 duration-200 ease-in-out' to={'/profile'} onClick={handleHideSidebar}>
                    <img src={photoURL} className='rounded-full w-10'/><p>{userName}</p>
                </Link>
                <NavLink to='/home' className='flex gap-2 items-center font-medium hover:scale-110 duration-200 ease-in-out delay-200' onClick={handleHideSidebar}><AiOutlineHome fontSize={25}/>Dla Ciebie</NavLink>
                <NavLink to='/following' className='flex gap-2 items-center font-medium hover:scale-110 duration-200 ease-in-out delay-200' onClick={handleHideSidebar}><IoPeopleOutline fontSize={25}/>Obserwuje</NavLink>
                <NavLink to='/explore' className='flex gap-2 items-center font-medium hover:scale-110 duration-200 ease-in-out delay-200' onClick={handleHideSidebar}><RiCompass3Line fontSize={25}/>Odkryj</NavLink>
                <NavLink to='/live' className='flex gap-2 items-center font-medium hover:scale-110 duration-200 ease-in-out delay-200' onClick={handleHideSidebar}><RiLiveLine fontSize={25}/>Live</NavLink>
            </div>
            <Link to='/upload' className='flex flex-row gap-2 px-4 py-1 items-center border font-medium w-min hover:scale-110 duration-200 ease-in-out' onClick={handleHideSidebar}><AiOutlinePlus/><p>Prześlij</p></Link>
            
        </div>
    </div>
  )
}

export default SmallSidebar