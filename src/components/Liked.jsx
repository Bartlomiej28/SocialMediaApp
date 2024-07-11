import React from 'react'
import MiniPost from './MiniPost'
import useGetLikedPosts from '../hooks/useGetLikedPosts';
import Loader from './Loader';

function Liked() {
  const {likedPostsData, isLoading} = useGetLikedPosts();

  if(isLoading){
    return <Loader color='#fe2c55' secondaryColor='white' height='h-screen' width='w-full' size='80'/>;
  }

  return (
    <div>
      {likedPostsData.map((post) =>(
        <MiniPost id={post.id} filePath={post.filePath} postedBy={post.postedBy}/>
      ))}
    </div>
  )
}

export default Liked