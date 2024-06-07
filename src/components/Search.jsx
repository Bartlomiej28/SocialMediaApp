import React from 'react'
import TikTok from './TikTok';
import useSearch from '../hooks/useSearch';
import SkeletonPost from './SkeletonPost';

function Search() {
  const searchItem = decodeURIComponent(window.location.href.split('/')[4]);
  let i;
  for(i=0; i<=searchItem.length; i++)
    if(searchItem[i] === '%') searchItem[i] = ' '
    
  const {isLoading, tiktoks} = useSearch(searchItem);
  console.log(tiktoks)
  return (
    <div className='flex flex-col gap-4 p-4 items-center'>
      
        {isLoading 
        ? 
        <SkeletonPost/>
        :
        <>
          {tiktoks.map((item) =>
            <TikTok
                key={item.id} 
                publishedBy={item.data.postedBy}
                content={item.data.content} 
                filePath={item.data.filePath} 
                tiktokId={item.id}
                likedBy={item.data.likedBy}
                comments={item.data.comments}
            />
          )}
        </>
        }
      
    </div>
  )
}

export default Search