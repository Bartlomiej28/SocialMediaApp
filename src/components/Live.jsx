import React from 'react'
import { useSelector } from 'react-redux';

function Live() {
  const likedPosts = useSelector((state) => state.userData.likedPosts);
  console.log(likedPosts)
  const userInfoString = localStorage.getItem('user');
  const userJSON = JSON.parse(userInfoString)
  console.log(userJSON)
  return (
    <div className='flex justify-center items-center p-4 sm:pt-20'>
      <div className='opacity-50 text-2xl'>Nobody is streaming live now</div>
    </div>
  );
}
    
export default Live;