import React from 'react';
import TikTok from './TikTok';
import useGetSuggestedUsers from '../hooks/useGetSuggestedUsers';
import Loader from './Loader';
import MiniProfile from './MiniProfile';
import useGetSuggestedPosts from '../hooks/useGetSuggestedPosts';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SkeletonPost from './SkeletonPost';

function Explore() {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();
  const { isLoadingPosts, suggestedPosts } = useGetSuggestedPosts();

  if (isLoading) {
    return (
      <Loader color='#fe2c55' secondaryColor='white' height='h-screen' width='w-full' size='80'/>
    );
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2
    }
  };

  return (
    <div className='flex flex-col p-4 items-center gap-4 sm:pt-20 h-full overflow-scroll'>
      <div className='w-full h-1/3 mb-14'>
        <p className='text-xl font-medium'>Polecani użytkownicy:</p>
        <Carousel swipeable={false} draggable={false} showDots={true} responsive={responsive} ssr={false} infinite={true} autoPlay={true} 
                  autoPlaySpeed={1000} keyBoardControl={true} customTransition='all .5' transitionDuration={1000} containerClass='carousel-container'
                  removeArrowOnDeviceType={['tablet', 'mobile']} deviceType={'desktop'} dotListClass='custom-dot-list-style' itemClass='carousel-item-padding-40-px'
        >
        {suggestedUsers.map((suggestedUser) => (
            <MiniProfile key={suggestedUser.id} profileId={suggestedUser.id} />
        ))}
        </Carousel>
      </div>

      <div className='w-full '>
        <p className='text-xl font-medium'>Polecane posty:</p>
      </div>
        
        {isLoadingPosts === true ? <SkeletonPost/> : 
        <>
          {suggestedPosts.map((suggestedPost) => (
          <TikTok
            key={suggestedPost.id}
            publishedBy={suggestedPost.data.postedBy}
            content={suggestedPost.data.content}
            filePath={suggestedPost.data.filePath}
            tiktokId={suggestedPost.id}
            likedBy={suggestedPost.data.likedBy}
            comments={suggestedPost.data.comments}
          />
          ))}
        </>
        }
    </div>
  );
}

export default Explore;


/*
<div className='w-10/12 h-auto bg-yellow-500 z-100'>
        {suggestedUsers.map((suggestedUser) => (
          <MiniProfile key={suggestedUser.id} profileId={suggestedUser.id} />
        ))}
      </div>


<div className='w-10/12'>
        {suggestedPosts.map((suggestedPost) => (
          <TikTok
            key={suggestedPost.id}
            publishedBy={suggestedPost.data.postedBy}
            content={suggestedPost.data.content}
            filePath={suggestedPost.data.filePath}
            tiktokId={suggestedPost.id}
            likedBy={suggestedPost.data.likedBy}
            comments={suggestedPost.data.comments}
          />
        ))}
      </div>
      */