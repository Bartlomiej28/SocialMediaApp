import { useEffect, useState } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { database } from '../utils/database';


function useGetFollowingPosts(following) {
  const [isLoading, setIsLoading] = useState(false);
  const [followigPosts, setFollowingPosts] = useState([]);
  const collectionRef = collection(database, 'tiktoks');
  

  const q = query(
    collectionRef, 
    where('postedBy', 'in', [0,...following])); 


    useEffect(() => {
        const fetchFollowingPosts = async () => {
          setIsLoading(true);
          try {
            const querySnapshot = await getDocs(q);
            const followingPostsData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }));
            setFollowingPosts(followingPostsData);
          } catch (error) {
            console.log(error.message);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchFollowingPosts();
      }, [following, q]);

  return { isLoading, followigPosts };
}

export default useGetFollowingPosts;