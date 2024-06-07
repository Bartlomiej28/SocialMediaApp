import { useState } from "react"
import { database } from '../utils/database'; 
import { doc, updateDoc } from 'firebase/firestore';

function useEditPost(id, category, description) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSaveEditPost = async() =>{
    const postRef = doc(database, 'tiktoks', id);
      setIsLoading(true);
      try {
        await updateDoc(postRef, {
          category: category.current.value,
          content: description.current.value,
        });
        }catch(error){
            console.error("Błąd podczas aktualizacji dokumentu: ", error);
        }finally{
            setIsLoading(false);
        }
    }

    return {isLoading, handleSaveEditPost}
}

export default useEditPost