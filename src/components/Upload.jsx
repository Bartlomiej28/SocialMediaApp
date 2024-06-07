import React, {useRef} from 'react'
import Alert from './alert';
import useUploadPost from '../hooks/useUploadPost';
import Loader from './Loader';
import { useState } from 'react';

import Confetti from 'react-confetti'

function Upload() {
  const contentRef = useRef();
  let categoryRef = useRef();
  const [categories, setCategories] = useState([])
  const {handleFileChange, handlePublish, success, isLoading, isFileExtentionSuccess} = useUploadPost(contentRef, categories);
  
  const handleAddCategory = () => {
    setCategories([...categories, categoryRef.current.value]);
    categoryRef.current.value = "";
  };
  
  return (
    <div className='p-4 flex flex-col gap-4 sm:pt-24'>
      {success && <Confetti width={window.innerWidth} height={window.innerHeight}/>}
      <p className='text-xl font-bold'>Utwórz swój nowy post</p>
      <input type='text' placeholder='Wpisz tekst...' className='border w-1/2 xsm:w-full sm:w-full md:w-full lg:w-full h-10 px-4 py-2' ref={contentRef}/>
      <input type='text' placeholder='Wpisz kategorię...' ref={categoryRef} className='border w-1/2 xsm:w-full sm:w-full md:w-full lg:w-full h-10 px-4 py-2'/>
      <button onClick={handleAddCategory} className='border border-[#fe2c55] px-4 py-2 w-1/2 sm:w-full'>Dodaj kategorię</button>
        <div className='w-full flex flex-wrap gap-2'>
        {categories.map((category, index) => (
          <p key={index} className='border rounded-full px-4 py-2'>{category}</p>
        ))}
        </div>
      <input type='file' onChange={handleFileChange} className='w-auto h-auto'/>
      {isFileExtentionSuccess !== true ? <p>Wgraj plik w formacie .mp4</p>: ''}

      <button onClick={handlePublish} className={`border w-min px-4 py-2 flex text-[#fe2c55]   border-[#fe2c55] ${isFileExtentionSuccess !== true ? 'opacity-60 ' : ''}`} disabled={isFileExtentionSuccess !== true ? true: false}>
        Opublikuj {isLoading && <Loader color='white' secondaryColor='#fe2c55' width='w-10' height='h-auto' size='20'/> }
      </button>
      
      
      {success && <Alert text='Post został pomyślnie dodany'/>}
      
    </div>
  )
}

export default Upload