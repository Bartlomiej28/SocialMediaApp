import React, {useRef} from 'react';
import {database} from '../utils/database';
import { doc} from 'firebase/firestore';
import Comment from './Comment';
import Alert from './alert';
import useFetchComments from '../hooks/useFetchComments';
import useSendComment from '../hooks/useSendComment';
import Loader from './Loader';

function Comments() {
    const newCommentContent = useRef();
    const tiktokId = window.location.href.split('/')[3];
    const tiktokRef = doc(database, 'tiktoks', tiktokId);

    const {isLoading, comments} = useFetchComments(tiktokId); 
    const {isSendingLoading, success, handleSendNewComment} = useSendComment(tiktokRef, newCommentContent);
    
    if(isLoading){
      return <Loader color='#fe2c55' secondaryColor='white' height='h-screen' width='w-full' size='80'/>
    }

  return (
    <div className='p-4 flex flex-col pt-16'>
        <label className='text-xl font-bold mb-4'>Komentarze ({comments.length})</label>
        <div className='flex flex-row w-1/3 xsm:w-full sm:w-full   mb-4 mt-4'>
            <input type='text' ref={newCommentContent} className='h-10 border px-4 py-2 w-4/5' placeholder='Napisz swój komentarz...'/>
            <button className='h-10 w-1/5  border bg-[#fe2c55] text-white' onClick={handleSendNewComment}>
              {isSendingLoading ? <Loader color='white' secondaryColor='#fe2c55' width='w-auto' height='h-auto' size='20'/>: 'Opublikuj'}
            
            </button>
        </div>
        {comments.map((item)=>(
            <Comment postedBy={item.postedBy}
                     text={item.commentContent}/>
        ))}
        <div className='w-full flex justify-center items-end'>
            {success ? <Alert text='Komentarz został pomyślnie dodany'/> : ''}
        </div>
    </div>
  )
}

export default Comments