import React, { useEffect, useState } from 'react'
import {database} from '../utils/database';
import {doc, getDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import useFollow from '../hooks/useFollow';
import Loader from './Loader';

function MiniProfile({profileId}) {
  const [profileData, setProfileData] = useState([]);
  const navigation = useNavigate();

  const {isUpdating, isFollowing, handleFollow} = useFollow(profileId)

    useEffect(()=>{
      const fetchProfiles = async()=>{
        const snap = await getDoc(doc(database, 'users-extra-info', profileId));
        try{
          setProfileData(snap.data());
        }
        catch(err){
          console.log(err)
        }
      }
      fetchProfiles();
    },[])
    
    const handleGoToProfile = () =>{
      navigation(`/user/${profileId}`);
    }

  return (
    <div className='w-1/8 xsm:w-full sm:w-full h-full flex flex-col items-center justify-center border cursor-pointer p-4'>
      <img src={profileData.photoURL} width={80} className='rounded-full mb-2' onClick={handleGoToProfile}/>
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