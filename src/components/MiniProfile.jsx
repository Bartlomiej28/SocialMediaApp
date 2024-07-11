import React from 'react'
import { useNavigate } from 'react-router-dom';
import useFollow from '../hooks/useFollow';
import Loader from './Loader';
import useFetchProfileData from '../hooks/useFetchProfileData';

function MiniProfile({profileId}) {
  const { profileData, isLoading } = useFetchProfileData(profileId);
  const navigation = useNavigate();
  const {isUpdating, isFollowing, handleFollow} = useFollow(profileId)

  const handleGoToProfile = () =>{
    navigation(`/user/${profileId}`);
  }

  if (isLoading) {
    return <Loader color='white' secondaryColor='#fe2c55' width='w-auto' height='h-auto' size='20' />;
  }

  return (
    <div className='w-1/8 xsm:w-full sm:w-full h-full flex flex-col items-center justify-center border cursor-pointer p-4'>
      <img src={profileData.photoURL} width={80} alt='profile' className='rounded-full mb-2' onClick={handleGoToProfile}/>
      <p className='font-bold w-full  text-center truncate ' onClick={handleGoToProfile}>{profileData.displayName}</p>
      <p className='truncate h-6 text-ellipsis w-full text-center'>{profileData.diagram}</p>
      <button className={`px-16 py-1 sm:px-4  flex gap-4 rounded-sm font-bold  border border-[#fe2c55] ${isFollowing ? `bg-white text-[#fe2c55]` : `bg-[#fe2c55] text-white`}`} onClick={handleFollow}>
        {isFollowing ? "Unfollow": "Follow"}
        {isUpdating ? <Loader color='white' secondaryColor='#fe2c55' width='w-auto' height='h-auto' size='20'/>: ''}
      </button>
    </div>
  )
}

export default MiniProfile