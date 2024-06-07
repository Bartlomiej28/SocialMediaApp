import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import EditPost from './EditPost';
import useDeletePost from '../hooks/useDeletePost';
import Loader from './Loader';
import { Link } from 'react-router-dom';

function MiniPost({id, filePath, postedBy}) {

  const currentId = useSelector((state)=>state.userData.id);
  const [showEditWindow, setShowEditWindow] = useState(false);
  const {isLoadingdelete, handleDeletePost} = useDeletePost(id);

  const handleEditWindow = () =>{
    setShowEditWindow(showEditWindow => !showEditWindow);
  }

  return (
  <>
  <Link className='relative w-1/6 sm:w-1/2 h-auto flex bg-black justify-center' to={`/tiktok/${id}`}>
    <video className='h-auto w-11/12 flex justify-center hover:bg-opacity-50' controls>
        <source src={filePath} type="video/mp4" alt='tiktok-video' className='h-80' />
    </video>
    {currentId == postedBy ? 
    <div className="absolute top-0 left-0 w-full h-5/6 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black bg-opacity-50 text-white flex flex-row sm:flex-col items-center justify-center w-full h-full gap-8">
            <button className="py-2 px-4 border border-[#fe2c55]" onClick={handleEditWindow}>Edytuj</button>
            <button className="py-2 px-4 border border-[#fe2c55] text-[#fe2c55]" onClick={handleDeletePost}>
              Usuń
              {isLoadingdelete ? <Loader color='white' secondaryColor='#fe2c55' width='w-auto' height='h-auto' size='20'/>: ''}
            </button>
        </div>
    </div>
    : ''}
  </Link>
    {showEditWindow && <EditPost showEditWindow={showEditWindow} setShowEditWindow={setShowEditWindow} postId={id}/>}
  </>
  )
}

export default MiniPost