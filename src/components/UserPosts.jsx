import React from 'react'
import MiniPost from './../components/MiniPost'
import  useFetchUserPosts  from '../hooks/useFetchUserPosts'
import { useSelector } from 'react-redux';

function UserPosts() {
  
  const id = useSelector((state)=> state.userData.id);
  const {posts, isLoading} = useFetchUserPosts(id);
  
  return (
    <div className='w-full h-auto flex flex-wrap'>
        {posts.map((post) =>(
              <MiniPost id={post.id} filePath={post.data.filePath} postedBy={post.data.postedBy}/>
            ))}
    </div>
  )
}

export default UserPosts

