import { useState } from 'react';
import { database, storage } from '../utils/database';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function useUploadPost(contentRef, categories) {
  const [isFileExtentionSuccess, setIsFileExtentionSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const tiktoksRef = collection(database, 'tiktoks');
  const currentUser = useSelector((state) => state.userData.id);
  const navigation = useNavigate();

  function getFileExtension(filename) {
    const ext =  filename.split('.').pop()
    return ext
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const extention = getFileExtension(selectedFile.name)
    if(extention === 'mp4'){
      setFile(selectedFile);
      console.log('Dobry plik')
      setIsFileExtentionSuccess(true)
    }else{
      console.log('Błąd formatu pliku')
      setIsFileExtentionSuccess(false)
    }
    
    
  };

  const successfullySendedTiktok = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 10000);
    
  };

  const publishTiktok = async (filePath) => {

    const content = contentRef.current.value;
    
    const contentArray = content.replaceAll(" ", ",").split(",");
    

    const newTikTok = {
      postedBy: currentUser,
      content: contentArray,
      filePath: filePath,
      comments: [],
      likedBy: [],
      category: categories,
      createdAt: serverTimestamp(),
    };
    await addDoc(tiktoksRef, newTikTok);
    successfullySendedTiktok();
  };

  const uploadAndGetURL = async () => {
    try {
      const TiktokRef = ref(storage, 'movies/' + file.name);
      const uploadTiktok = uploadBytesResumable(TiktokRef, file);

      uploadTiktok.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      });

      const snapshot = await uploadTiktok;
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('File available at', downloadURL);
      return downloadURL;
    } catch (err) {
      console.error('Error uploading file:', err);
      throw err;
    }
  };

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      const url = await uploadAndGetURL();
      await publishTiktok(url);
    } catch (err) {
      console.error('Error publishing TikTok:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { success, isLoading, handleFileChange, handlePublish, isFileExtentionSuccess };
}

export default useUploadPost;