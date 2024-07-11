import React from 'react';
import TikTok from './TikTok';
import useGetPosts from '../hooks/useGetPosts';
import Loader from './Loader';

function ForYou() {
  const { isLoading, tiktoks } = useGetPosts();
 
  if (isLoading) {
    return <Loader color='#fe2c55' secondaryColor='white' height='h-screen' width='w-full' size='80'/>;
  }

  return (
   <div className="flex flex-col gap-4 items-center sm:bg-black h-full snap-y snap-mandatory overflow-auto">
      {tiktoks.map((item) => (
        <TikTok
          key={item.id}
          publishedBy={item.data.postedBy}
          content={item.data.content}
          filePath={item.data.filePath}
          tiktokId={item.id}
          likedBy={item.data.likedBy}
          comments={item.data.comments}
        />
      ))}
    </div>
  );
}

export default ForYou;