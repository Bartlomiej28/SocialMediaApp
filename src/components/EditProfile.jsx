import React, { useRef, useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import useEditProfile from '../hooks/useEditProfile';

function EditProfile({ showEditWindow, setShowEditWindow }) {
  const nameRef = useRef();
  const diagramRef = useRef();

  const currentName = useSelector((state) => state.userData.displayName);
  const currentDiagram = useSelector((state) => state.userData.diagram);
  const currentImage = useSelector((state) => state.userData.photoURL);

  useEffect(() => {
    nameRef.current.value = currentName;
    diagramRef.current.value = currentDiagram;
  }, [currentName, currentDiagram]);

  const { handleSaveEditProfile, isLoading, handleFileChange } = useEditProfile(nameRef, diagramRef, currentImage);

  const handleCloseWindow = () => {
    setShowEditWindow(!showEditWindow);
  };

  return (
    <div className='absolute top-0 left-0 z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-1/3 xsm:w-full sm:w-full h-4/6 bg-white rounded-xl'>
        <button onClick={handleCloseWindow} className='absolute top-4 left-4'><AiOutlineCloseCircle fontSize={30} /></button>
        <div className='mt-16 flex flex-col gap-4 items-center'>
          <p className='font-bold text-xl'>Edit Your Profile</p>
          <img src={currentImage} className='w-20 h-20 rounded-full'/>
  
          <button className=''>Select new photo</button>
          <input type='file' onChange={handleFileChange} className='w-auto h-auto px-4 py-2 border'/>
          <input type='text' placeholder='Name' ref={nameRef} className='w-4/5 h-10 border px-4'/>
          <input type='text' placeholder='Diagram' ref={diagramRef} className='w-4/5 h-10 border px-4'/>
          <button onClick={handleSaveEditProfile} className='px-4 py-2 border shadow'>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;