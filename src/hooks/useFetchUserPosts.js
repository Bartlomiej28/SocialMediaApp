import { useEffect, useState } from 'react';
import { database } from '../utils/database';
import { getDocs, collection, query, where } from 'firebase/firestore';

function useFetchUserPosts(id) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const collectionRef = collection(database, 'tiktoks');
  const q = query(collectionRef, where('postedBy', '==', id));

  useEffect(() => {
    const fetchUserPosts = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(q);
        const authorPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setPosts(authorPosts);
      } catch (error) {
        console.error('Error fetching user posts: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPosts();
  }, [id]);

  return { posts, isLoading };
}

export default useFetchUserPosts;



