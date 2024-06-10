import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditPost from './EditPost';
import { Link } from 'react-router-dom';


function MiniPost({ id, filePath, postedBy }) {
  const currentId = useSelector((state) => state.userData.id);
  const [showEditWindow, setShowEditWindow] = useState(false);


  const handleEditWindow = (e) => {
    e.stopPropagation();
    setShowEditWindow((showEditWindow) => !showEditWindow);
  };


  return (
    <>
      <div className='w-1/6 sm:w-1/2 h-auto flex flex-col bg-black justify-center relative'>
      {/*
      {currentId === postedBy && (
          <div className="absolute top-0 w-full flex p-2  z-20">
            <button className="rounded-full bg-white text-[#fe2c55] px-4 py-2" onClick={handleEditWindow}>Edit</button>
          </div>
        )}
      */}
      
        <Link to={`/tiktok/${id}`} >
          <video className='h-auto w-11/12 flex justify-center hover:bg-opacity-50' controls={false}>
            <source src={filePath} type="video/mp4" alt='tiktok-video' className='h-80' />
          </video>
        </Link>
      </div>
      
      {showEditWindow && <EditPost showEditWindow={showEditWindow} setShowEditWindow={setShowEditWindow} postId={id} />}
    </>
  );
}

export default MiniPost;
