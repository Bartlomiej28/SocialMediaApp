import React from 'react';
import { Link } from 'react-router-dom';

function MiniPost({ id, filePath }) {
  
  return (
    <div className='w-1/6 sm:w-1/2 h-auto flex flex-col bg-black justify-center relative'>   
      <Link to={`/tiktok/${id}`} >
        <video className='h-auto w-11/12 flex justify-center hover:bg-opacity-50' controls={false}>
          <source src={filePath} type="video/mp4" alt='tiktok-video' className='h-80' />
        </video>
      </Link>
    </div>
    
  );
}

export default MiniPost;
