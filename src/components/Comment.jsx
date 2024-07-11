import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchCommentData from '../hooks/useFetchCommentData';
import SkeletonComment from './SkeletonComment'

function Comment({postedBy, text}) {
    const navigation = useNavigate();
    const {isLoading, authorData} = useFetchCommentData(postedBy);
    
    const handleGoToProfile = () =>{
        navigation(`/user/${postedBy}`)
    }
    
    if(isLoading){
      return <SkeletonComment/>
    }

  return (
    <div className='flex flex-row gap-4 pt-4' onClick={handleGoToProfile}>
      <img src={authorData.photoURL} alt='commentator_photo' width={50} height={40} className='rounded-full'/>
      <div className='flex flex-col'>
          <p>{authorData.displayName}</p>
          <p>{text}</p>
      </div>
    </div>
  )
}

export default Comment