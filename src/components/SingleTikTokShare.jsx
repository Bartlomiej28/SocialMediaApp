import React from 'react';
import Tiktok from '../components/TikTok'
import useFetchOnePost from '../hooks/useFetchOnePost';

function SingleTikTokShare() {

  const id = window.location.href.split('/')[4];
  const {isLoading, tiktok} = useFetchOnePost(id);

 

  console.log(isLoading)
  return (
    <div className='flex flex-col gap-4 p-4 items-center sm:pt-24 h-full overflow-scroll'>
      {isLoading ? '': 
      <>
          <Tiktok
            key={id}
            publishedBy={tiktok.postedBy}
            content = {tiktok.content} 
            filePath = {tiktok.filePath}
            tiktokId = {id}
            likedBy = {tiktok.likedBy} 
            comments = {tiktok.comments}/> 
      </>
      }
    </div>
  )
}

export default SingleTikTokShare