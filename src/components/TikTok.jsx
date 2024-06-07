import React, { useState } from 'react'
import {BsHeartFill} from 'react-icons/bs';
import {FaCommentDots, FaShare} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useTikTokFunctions from '../hooks/useTikTokFunctions';
import { useSelector } from 'react-redux';
import SkeletonPost from './SkeletonPost'
import './video.css'

function TikTok({publishedBy, content, filePath, tiktokId, likedBy, comments}) {
    
    const navigation = useNavigate();
    const currentUser = useSelector((state) => state.userData.id)
    const {isLoading, authorData, isLiked, handleLike} = useTikTokFunctions(publishedBy, tiktokId)
    const [showWholeText, setShowWholeText] = useState(false)
    const [likes, setLikes] = useState(likedBy.length)
    const handleCommentsSection = () =>{
        navigation(`/${tiktokId}/comments`);
    }

    const handleShare = () =>{
        navigator.clipboard.writeText(`http://localhost:3000/tiktok/${tiktokId}`);
    }

    const handleGoToProfile = () =>{
        if(publishedBy === currentUser){
            navigation('/profile')
        }else{
            navigation(`/user/${publishedBy}`)
        }
    }

    const handleSetWholeText = () =>{
        setShowWholeText(showWholeText => !showWholeText)
    }

    const correctContent = content.toString().replaceAll(',', ' ')
    
    const handleLikeAndAddOneLike =() =>{
        handleLike()
        if(isLiked){
            setLikes(likes-1)
        }else{
            setLikes(likes+1)
        }
    }

    if(isLoading) return <SkeletonPost/>

  return (
    <> 
        {window.innerWidth > 640 ? 
        <div className='relative w-1/2 xl:w-8/12 lg:w-9/12 md:w-8/12 flex flex-col shadow h-sidebar-height min-h-999 snap-start'>
            <div className='flex flex-row w-full h-1/6 pt-2 transparent p-4'>
                <div className='h-auto w-auto mr-2'>
                    <img src={authorData.photoURL} onClick={handleGoToProfile} width={60} alt='profile-photo' className='rounded-full cursor-pointer' />
                </div>
                <div className='flex flex-col w-10/12 h-auto'>
                    <p onClick={handleGoToProfile} className='cursor-pointer text-black font-bold'>{authorData.displayName}</p>
                    <p className='text-black h-full w-full  whitespace-pre-line truncate'>{correctContent}</p>
                </div>
            </div>
            <div className='flex flex-row h-5/6 '>
                <div className='flex w-5/6 h-full justify-center'>
                    <video className='h-full w-full flex justify-center' controls>
                        <source src={filePath} type="video/mp4" alt='tiktok-video' className='h-80' />
                    </video>
                </div>
                <div className='w-1/6 h-full flex flex-col justify-end items-center p-2'>
                    <div className='absolute bottom-20'>
                        <span>
                            <button className={`bg-[#f1f1f2] md:bg-transparent flex items-center justify-center h-12 w-12 rounded-full  duration-300  ${isLiked ? 'text-red-500' : 'text-black'}`} onClick={handleLike}><BsHeartFill fontSize={20}/></button>
                            <label className='flex justify-center text-black'>{likedBy.length}</label>
                        </span>
                        <span>
                            <button className='bg-[#f1f1f2] md:bg-transparent flex items-center justify-center h-12 w-12 rounded-full text-black' onClick={handleCommentsSection}><FaCommentDots fontSize={20}/></button>
                            <label className='flex justify-center  text-black'>{comments.length}</label>
                        </span>
                        <span>
                            <button className='bg-[#f1f1f2] md:bg-transparent flex items-center justify-center h-12 w-12 rounded-full focus:bg-red-500 duration-300 text-black' onClick={handleShare}><FaShare fontSize={20}/></button>
                        </span>
                    </div>
                    
                </div>
            </div>
        </div>
        :
        <div className='relative w-full sm:w-full flex flex-col bg-white sm:bg-black h-screen min-h-999 snap-start'>

            <div className={`flex flex-col w-10/12 p-4 absolute z-10 bottom-20 min-h-[16.666667%] h-1/6 ${showWholeText ? 'h-auto' : ''} `}>
                <p onClick={handleGoToProfile} className='cursor-pointer text-white font-bold'>{authorData.displayName}</p>
                <p className={`text-white  truncate text-wrap focus:bg-black ${showWholeText ? 'h-auto bg-black bg-opacity-50 rounded-sm transition delay-100' : ''} `} onClick={handleSetWholeText}>{correctContent}</p>
            </div>
            
            <div className='absolute top-0 left-0 flex w-full h-full justify-center'> 
                <video className='sm:h-auto sm:w-screen h-full w-full flex justify-center' controls>
                    <source src={filePath} type="video/mp4" alt='tiktok-video' className='h-80' />
                </video>
            </div>
            <div className='absolute bottom-28 right-0 w-min h-min flex flex-col justify-end items-center p-4'>
                
                <div className='h-auto mb-4'>
                    <img src={authorData.photoURL} onClick={handleGoToProfile} alt='profile-photo' width={60} className='rounded-full cursor-pointer border border-[#fe2c55]' />
                </div>
                
                <span className='-mb-2'>
                    <button className={`flex items-center justify-center h-12 w-12 rounded-full duration-300  ${isLiked ? 'text-red-500' : 'text-white'}`} onClick={handleLikeAndAddOneLike}><BsHeartFill fontSize={30}/></button>
                    <label className='flex justify-center text-white relative -top-2'>{likes}</label>
                </span>
                <span className='-mb-2'>
                    <button className='flex items-center justify-center h-12 w-12 rounded-full text-white' onClick={handleCommentsSection}><FaCommentDots fontSize={30}/></button>
                    <label className='flex justify-center  text-white relative -top-2'>{comments.length}</label>
                </span>
                <span>
                    <button className='bg-[#f1f1f2] md:bg-transparent flex items-center justify-center h-12 w-12 rounded-full focus:bg-red-500 duration-300 text-black md:text-white' onClick={handleShare}><FaShare fontSize={30}/></button>
                </span>
            </div>
        </div>
        }
        
        
    </>
    
    
  )
}

export default TikTok

/*<div className='relative w-6/12 sm:w-full flex flex-col shadow bg-white sm:bg-black h-sidebar-height  min-h-999 snap-start'>
sm:h-full sm:w-full h-full w-auto flex justify-center object-cover

*/