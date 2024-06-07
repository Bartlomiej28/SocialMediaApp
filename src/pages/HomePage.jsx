import React, {useEffect} from 'react';
import ForYou from '../components/ForYou';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Following from '../components/Following';
import Explore from '../components/Explore';
import Live from '../components/Live';
import {Routes, Route} from 'react-router-dom'
import Upload from '../components/Upload';
import Profile from '../components/Profile';
import Comments from '../components/Comments';
import SingleTikTokShare from '../components/SingleTikTokShare';
import OthersProfile from '../components/OthersProfile';
import Search from '../components/Search';
import { useDispatch } from 'react-redux';
import { userDataActions } from '../store/userData-slice';
import BottomBar from '../components/BottomBar';


function HomePage() {
  const dispatch = useDispatch();
  

  useEffect(() => {
    const userInfoString = localStorage.getItem('user');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : {};
    dispatch(userDataActions.setDataUser(userInfo));
  }, []);
  

  return ( 
    <div className='h-screen w-screen flex flex-col'>

      <div className='w-full fixed z-20 h-16 '>
        <Navbar/>
      </div>

      <div className='flex flex-row'>
        <div className='w-2/12 lg:w-3/12 xsm:hidden sm:hidden h-sidebar-height fixed top-16  left-0'>
          <Sidebar/>
        </div>
        <div className='w-10/12 lg:w-19/12 xsm:w-full sm:w-full absolute right-0 top-16 sm:top-0 h-sidebar-height sm:h-screen overflow-hidden'>
          <Routes>
            <Route path='/home/*' element={<ForYou/>}/>
            <Route path='/following' element={<Following/>}/>
            <Route path='/explore' element={<Explore/>}/>
            <Route path='/live' element={<Live/>}/>
            <Route path='/search/:id' element={<Search/>}/>
            <Route path='/upload' element={<Upload/>}/>
            <Route path='/profile/*' element={<Profile/>}/>
            <Route path='/:id/comments' element={<Comments/>}/>
            <Route path='/tiktok/:id' element={<SingleTikTokShare/>}/>
            <Route path='/user/:id' element={<OthersProfile/>}/>
          </Routes>
        </div>  
      </div>

      <div className='w-full h-12 bg-red-500 bottom-0 hidden sm:block z-50 fixed'>
        <BottomBar/>
      </div>


    </div>
  

  )
}

export default HomePage
/*className='h-sidebar-height sm:h-screen overflow-hidden'*/ 