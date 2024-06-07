import React from 'react';
import {AiOutlineHome} from 'react-icons/ai';
import {IoPeopleOutline} from 'react-icons/io5';
import {RiLiveLine, RiCompass3Line} from 'react-icons/ri';
import {NavLink} from 'react-router-dom';
import './active.css'

function Sidebar() {
  
  const options = ['Informations', 'News', 'Contacts', 'Career', 'TikTok for Good', 'Advertisement', 'Developers', 'Openness', 'TikTok Rewards',
                   'TikTok Embeds', 'Help', 'Security', 'Terms', 'Privacy', 'Creator Portal', 'Community Rules', 'Copyright', 'More']

  return (
    <div className='flex flex-col h-full justify-between '>
      <div className='flex flex-col gap-4 pt-8 pb-4 px-4  border-0 border-b'>
        <NavLink to='/home' className='flex gap-2 items-center font-medium'><AiOutlineHome fontSize={25}/>Dla Ciebie</NavLink>
        <NavLink to='/following' className='flex gap-2 items-center font-medium'><IoPeopleOutline fontSize={25}/>Obserwuje</NavLink>
        <NavLink to='/explore' className='flex gap-2 items-center font-medium'><RiCompass3Line fontSize={25}/>Odkryj</NavLink>
        <NavLink to='/live' className='flex gap-2 items-center font-medium'><RiLiveLine fontSize={25}/>Live</NavLink>
      </div>
      <div className='flex flex-wrap gap-2 px-4 pb-8 pt-4 border-0 border-t'>
        {options.map(option =>(
          <p className='text-xs text-gray-500' key={option}>{option}</p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar