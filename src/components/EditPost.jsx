import React, {useRef} from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import useEditPost from '../hooks/useEditPost';
import Loader from './Loader';
import useDeletePost from '../hooks/useDeletePost';

function EditPost({showEditWindow, setShowEditWindow, postId}) {
    const categoryRef = useRef();
    const descriptionRef = useRef();
    const { isLoadingdelete, handleDeletePost } = useDeletePost(postId);
    const {isLoading, handleSaveEditPost} = useEditPost(postId, categoryRef, descriptionRef)
    
    const handleCloseWindow = () => {
        setShowEditWindow(!showEditWindow);
      };

  return (
    <div className='absolute top-0 left-0 z-30 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-1/3 xsm:w-full sm:w-full h-4/6 bg-white rounded-xl'>
        <button onClick={handleCloseWindow} className='absolute top-4 left-4'><AiOutlineCloseCircle fontSize={30} /></button>
        <div className='mt-16 flex flex-col gap-4 items-center'>
          <p className='font-bold text-xl'>Edit Your Post</p>
          <input type='text' placeholder='Category' ref={categoryRef} className='w-4/5 h-10 border px-4'/>
          <input type='text' placeholder='Description' ref={descriptionRef} className='w-4/5 h-10 border px-4'/>
          <button onClick={handleSaveEditPost} className='px-4 py-2 border shadow'>{isLoading ? <Loader color='white' secondaryColor='#fe2c55' width='w-auto' height='h-auto' size='20'/> : 'Save Changes'}</button>
          <button className="py-2 px-4 border border-[#fe2c55] text-[#fe2c55]" onClick={handleDeletePost}>
              Delete Post
              {isLoadingdelete ? <Loader color='white' secondaryColor='#fe2c55' width='w-auto' height='h-auto' size='20'/> : ''}
            </button>
        </div>
      </div>
    </div>
  )
}

export default EditPost