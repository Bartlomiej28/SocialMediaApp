import React, {useState} from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate, Link } from 'react-router-dom';
import Liked from './Liked';
import UserPosts from './UserPosts';

function Profile() {
  const [showEditWindow, setShowEditWindow] = useState(false);
  const {photoURL, displayName, following, followers, diagram} = useSelector((state)=> state.userData);
  const navigation = useNavigate();
  
  const handleEditProfile = () =>{
    setShowEditWindow(!showEditWindow);
  }
  
  const handleLogOut = () =>{
    localStorage.removeItem('user');
    navigation('/');
  }

  return (
    <>
    <div className='p-4 flex flex-col gap-4 sm:pt-24 h-full overflow-scroll'>
      <div className='flex gap-4 items-center w-full'>
        <img src={photoURL} className='rounded-full' width={100} alt='profile'/>
        
          <label className='font-bold text-3xl truncate h-auto text-wrap w-auto'>{displayName}</label>
        
      </div>
      <div className='flex flex-col gap-2 h-auto'>
        <div className='flex flex-row gap-4 items-center'>
          <label><b>{following === undefined ? '0' : following.length}</b> Obserwowani</label>
          <label><b>{followers === undefined ? '0' : followers.length}</b> Obserwuje</label>
          <button onClick={handleEditProfile} className='w-auto h-auto px-4 py-2 border border-[#fe2c55] text-[#fe2c55]'>Edit Profile</button>
        </div>
        <div>
          Diagram: {diagram}
        </div>
        <div className='w-full py-2 flex flex-row gap-1'>
          <Link className='w-1/2 border shadow-md py-2 flex justify-center' to='/profile'>Opublikowane</Link>
          <Link className='w-1/2 border shadow-md py-2 flex justify-center' to='/profile/liked'>Polubione</Link>
        </div>
        <div className='w-full h-auto'>
          <Routes>
            <Route path="/" element={<UserPosts/>}/>
            <Route path='/liked' element={<Liked/>}/>
          </Routes>
        </div>
      </div>
      <button className='w-full flex justify-center border border-[#fe2c55] px-4 py-2 mb-8' onClick={handleLogOut}>Log out</button>
    </div>
    {showEditWindow && <EditProfile showEditWindow={showEditWindow} setShowEditWindow={setShowEditWindow}/>}
    </>
  )
}

export default Profile