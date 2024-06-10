import React from 'react'
import MiniProfile from './MiniProfile';
import { useSelector } from 'react-redux';
import useGetFollowingPosts from '../hooks/useGetFollowingPosts';
import TikTok from './TikTok';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SkeletonPost from './SkeletonPost';

function Following() {
  const following = useSelector((state) => state.userData.following)
  const {isLoading, followigPosts} = useGetFollowingPosts(following);
  console.log(isLoading)
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 
    }
  };
  return (
    <div className='flex flex-col gap-4 p-4 items-center sm:pt-24 h-full overflow-scroll'>
      {following.length > 0 ? 
      <>
        <div className='w-full h-4/10 mb-14'>
          <p className='text-xl font-medium'>Obserwujesz:</p>
          <Carousel swipeable={false} draggable={false} showDots={true} responsive={responsive} ssr={false} infinite={true} autoPlay={true} 
                    autoPlaySpeed={1000} keyBoardControl={true} customTransition='all .5' transitionDuration={1000} containerClass='carousel-container'
                    removeArrowOnDeviceType={['tablet', 'mobile']} deviceType={'desktop'} dotListClass='custom-dot-list-style' itemClass='carousel-item-padding-40-px'
          >
          {following.map((item)=>(
            <MiniProfile key={item} profileId={item}/>
          ))}
          </Carousel>
        </div>

        <div className='w-full'>
          <p className='text-xl font-medium'>Posty obserwowanych:</p>
        </div>
          {isLoading ? <SkeletonPost/> : <>
            {followigPosts.map((followingPost)=>(
              <TikTok
              key={followingPost.id}
              publishedBy={followingPost.data.postedBy}
              content={followingPost.data.content}
              filePath={followingPost.data.filePath}
              tiktokId={followingPost.id}
              likedBy={followingPost.data.likedBy}
              comments={followingPost.data.comments}
            />
            ))}
          </>}
      </> : 'Nikogo nie obserwujesz' }

    </div>
  )
}

export default Following