import { useState } from "react";
import { database } from "../utils/database";
import { doc, deleteDoc } from "firebase/firestore";

function useDeletePost(id) {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const handleDeletePost = async () => {
    try {
      setIsLoadingDelete(true);
      await deleteDoc(doc(database, "tiktoks", id));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return { isLoadingDelete, handleDeletePost };
}

export default useDeletePost;