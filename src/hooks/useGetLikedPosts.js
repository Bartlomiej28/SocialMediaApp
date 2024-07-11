import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { database } from '../utils/database';
import { useSelector } from 'react-redux';

function useGetLikedPosts() {
  const likedPosts = useSelector((state) => state.userData.likedPosts);
  const [likedPostsData, setLikedPostsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLikedPostsData = async () => {
      setIsLoading(true);
      const data = [];

      try {
        for (const postID of likedPosts) {
          const postRef = doc(database, 'tiktoks', postID);
          const postSnap = await getDoc(postRef);

          if (postSnap.exists()) {
            data.push({
              id: postID,
              filePath: postSnap.data().filePath,
              postedBy: postSnap.data().postedBy,
            });
          } else {
            console.log('Brak danych dla postu o ID:', postID);
          }
        }
        setLikedPostsData(data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych polubionych postów:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikedPostsData();
  }, [likedPosts]);

  return { likedPostsData, isLoading };
}

export default useGetLikedPosts;
