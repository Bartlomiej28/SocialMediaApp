import React from 'react';

function SkeletonComment() {
  return (
    <div className='flex flex-row gap-4 pt-4 animate-pulse'>
      <div className='rounded-full bg-gray-300 h-12 w-12'></div>
      <div className='flex flex-col flex-1 space-y-2'>
        <div className='h-4 bg-gray-300 rounded w-3/4'></div>
        <div className='h-4 bg-gray-300 rounded w-full'></div>
      </div>
    </div>
  );
}

export default SkeletonComment;