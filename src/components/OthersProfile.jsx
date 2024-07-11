import React from 'react';
import useFollow from '../hooks/useFollow';
import useAccountData from '../hooks/useAccountData';
import Loader from './Loader';
import MiniPost from './MiniPost';

function OthersProfile() {
    const userID = window.location.href.split('/')[4];
    const {isFollowing, isUpdating, handleFollow} = useFollow(userID);
    const {isLoading, accountData, userPosts, isLoadingPosts } = useAccountData(userID);
    
    if(isLoading){
      return <Loader color='#fe2c55' secondaryColor='white' height='h-screen' width='w-full' size='80'/>
    }
    
  return (
    <div className='p-4 flex flex-col gap-4 sm:pt-24 h-full overflow-scroll'>
      <div className='flex flex-row gap-4'>
        <img src={accountData.photoURL} className='rounded-full' width={100} alt='profile'/>
        <div className='flex flex-col gap-4 w-full'>
          <label className='font-bold text-3xl h-auto text-wrap truncate w-full '>{accountData.displayName}</label>
          <button className={`px-16 py-1 flex gap-4 rounded-sm font-bold w-min border border-[#fe2c55] ${isFollowing ? `bg-white text-[#fe2c55]` : `bg-[#fe2c55] text-white`}`} onClick={handleFollow}>
            {isFollowing ? "Unfollow": "Follow"}
            {isUpdating ? <Loader color='white' secondaryColor='#fe2c55' width='w-auto' height='h-auto' size='20'/>: ''}
          </button>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-row gap-4'>
          <label><b>{accountData.following ? accountData.following.length : '0' }</b> Following</label>
          <label><b>{accountData.followers ? accountData.followers.length : '0'}</b> Followers</label>
        </div>
        <div className='mb-4'>
          {accountData.diagram}
        </div>
        <div className='w-full h-auto flex flex-wrap mb-8'>
          {isLoadingPosts ? <Loader color='#fe2c55' secondaryColor='white' height='h-screen' width='w-full' size='80'/> : <>
            {userPosts.map((post) =>(
            <MiniPost key={post.id} id={post.id} filePath={post.data.filePath} postedBy={post.data.postedBy}/>
            ))}
          </>}  
        </div>
      </div>
    </div>
  )
}

export default OthersProfile;
