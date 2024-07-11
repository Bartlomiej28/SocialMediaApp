import { useState } from 'react';
import { useSelector } from 'react-redux';
import { database, storage } from '../utils/database'; 
import { doc, updateDoc } from 'firebase/firestore'; 
import { useDispatch } from 'react-redux';
import { userDataActions } from '../store/userData-slice';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function useEditProfile(nameRef, diagramRef, currentImage) {
    const [isLoading, setIsLoading] = useState(false);
    const currentUser = useSelector((state)=> state.userData.id);

    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    };

    const uploadAndGetURL = async () => {
      try {
        const profileRef = ref(storage, 'profileImages/' + file.name);
        const uploadProfileImage = uploadBytesResumable(profileRef, file);
  
        uploadProfileImage.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        });
  
        const snapshot = await uploadProfileImage;
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('File available at', downloadURL);
        return downloadURL
      } catch (err) {
        console.error('Error uploading file:', err);
        throw err;
      }
    };

    const handleUpdateData = async(url) =>{

      const userRef = doc(database, 'users-extra-info', currentUser);
      await updateDoc(userRef, {
        photoURL: url,
        displayName: nameRef.current.value,
        diagram: diagramRef.current.value,
      });

      dispatch(userDataActions.changeName(nameRef.current.value))
      dispatch(userDataActions.changeDiagram(diagramRef.current.value))
      dispatch(userDataActions.changePhoto(url))

      const user = JSON.parse(localStorage.getItem('user'));
      user.displayName = nameRef.current.value;
      user.diagram = diagramRef.current.value;
      user.photoURL = url;
      localStorage.setItem('user', JSON.stringify(user));
    }


    const handleSaveEditProfile = async () => {
      
      setIsLoading(true);
      
      try {
        if(file){
          const url = await uploadAndGetURL();
          await handleUpdateData(url);
        }else{
          await handleUpdateData(currentImage);
        }
        
      } catch (error) {
        console.error("Błąd podczas aktualizacji dokumentu: ", error);
      } finally {
        setIsLoading(false);
      }
    }
    return { isLoading, handleSaveEditProfile, handleFileChange };
}

export default useEditProfile;