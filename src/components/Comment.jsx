import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchCommentData from '../hooks/useFetchCommentData';
import SkeletonComment from './SkeletonComment'
import { useSelector } from 'react-redux';

function Comment({postedBy, text}) {
    const navigation = useNavigate();
    const {isLoading, authorData} = useFetchCommentData(postedBy);
    const currentUser = useSelector((state) => state.userData.id);
    const handleGoToProfile = () => {
        if (postedBy === currentUser) {
          navigation('/profile');
        } else {
          navigation(`/user/${postedBy}`);
        }
    };
    
    if(isLoading){
      return <SkeletonComment/>
    }

  return (
    <div className='flex flex-row gap-4 pt-4' onClick={handleGoToProfile}>
      <img src={authorData.photoURL} alt='commentator_photo' width={50} height={40} className='rounded-full cursor-pointer'/>
      <div className='flex flex-col'>
          <p className='cursor-pointer'>{authorData.displayName}</p>
          <p>{text}</p>
      </div>
    </div>
  )
}

export default Comment