import React from 'react'
import MiniPost from './../components/MiniPost'
import  useFetchUserPosts  from '../hooks/useFetchUserPosts'
import { useSelector } from 'react-redux';
import SkeletonPost from './SkeletonPost';

function UserPosts() {
  
  const id = useSelector((state)=> state.userData.id);
  const {posts, isLoading} = useFetchUserPosts(id);
  
  if(isLoading){
    return <SkeletonPost/>
  }

  return (
    <div className='w-full h-auto flex flex-wrap'>
        {posts.map((post) =>(
          <MiniPost id={post.id} filePath={post.data.filePath} postedBy={post.data.postedBy}/>
        ))}
    </div>
  )
}

export default UserPosts

