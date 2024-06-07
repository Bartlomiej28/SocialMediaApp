import React, {useEffect, useRef, useState} from 'react';
import {FaTiktok} from 'react-icons/fa';
import {AiOutlinePlus, AiOutlineLogout, AiOutlineSearch} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { useSelector } from 'react-redux';
import {RiLiveLine} from 'react-icons/ri';

function Navbar() {
  const [showInput, setShowInput] = useState(false);
  const [place, setPlace] = useState('home')
  const navigation = useNavigate();
  const photoURL = useSelector((state) => state.userData.photoURL);
  const searchItem = useRef();

  const handleLogOut = () =>{
    localStorage.removeItem('user');
    navigation('/');
  }

  const handleSearch = () =>{
    navigation(`/search/${searchItem.current.value}`)
  }

  const handleShowInput = () => {
    setShowInput(showInput => !showInput);
  }

  useEffect(()=>{
    const currentPlace = window.location.href.split('/')[3];
    setPlace(currentPlace)
  })
  

  return (
    <div className={`flex flex-row justify-between text-black border items-center px-4 h-full sm:border-none bg-white ${place === 'home' ? 'sm:bg-transparent sm:text-white' : ' sm:text-black sm:shadow-md '}`}>

      <div className='w-3/12 sm:w-1/12 '>

        <Link to='/home' className='sm:hidden'>
          <FaTiktok className='text-3xl'/>
          <p className='text-3xl font-bold'>TikTok</p>
        </Link>

        <Link to='/live' className='font-medium hidden sm:block'>
          <RiLiveLine fontSize={25}/>
        </Link>
      </div>

      <div className={`relative w-4/12 md:w-8/12 sm:w-8/12 mx-4 h-max ${showInput === true ? 'sm:block' : 'sm:hidden'}`}>
        <input type='text' placeholder='Szukaj' className={`py-2 px-4 w-full bg-[#f1f1f2] sm:bg-transparent sm:border rounded-full outline-none ${place === 'home'? 'sm:border-white' : 'sm:border sm:border-black'}`} ref={searchItem}/>
        <button className='absolute right-0 top-0 w-16 h-full  flex justify-center items-center rounded-full hover:bg-[#e4e4e6] duration-200 ease-in-out ' onClick={handleSearch}><AiOutlineSearch fontSize={20}/></button>
      </div>

      <div className='flex flex-row gap-4 items-center w-3/12 sm:w-2/12  justify-end '>
        <Link to='/upload' className='flex flex-row gap-2 px-4 py-1 items-center w-auto border font-medium xsm:hidden sm:hidden hover:scale-110 duration-200 ease-in-out'><AiOutlinePlus/><p>Prześlij</p></Link>
        
        <button className='items-center border font-medium rounded-full sm:hidden hover:scale-110 duration-200 ease-in-out' onClick={() =>{navigation('/profile')}}>
          <img src={photoURL} className='rounded-full w-10'/>
        </button>

        <AiOutlineLogout fontSize={25} onClick={handleLogOut} className='cursor-pointer xsm:hidden sm:hidden hover:scale-110 duration-200 ease-in-out'/>

        <button className='items-center font-bold rounded-full hidden sm:block w-10 h-10 hover:scale-110 duration-200 ease-in-out ' onClick={handleShowInput}>
          <AiOutlineSearch fontSize={25}/>
        </button>
      </div> 
    </div>
  )
}

export default Navbar