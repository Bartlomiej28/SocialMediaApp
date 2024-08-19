import { useEffect, useState } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { database } from '../utils/database';


function useGetFollowingPosts(following) {
  const [followigPosts, setFollowingPosts] = useState([]);

  const collectionRef = collection(database, 'tiktoks');
  
  
    const q = query( collectionRef, where('postedBy', 'in', [0,...following])); 


    useEffect(() => {
        const fetchFollowingPosts = async () => {
          try {
            const querySnapshot = await getDocs(q);
            const followingPostsData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }));
            setFollowingPosts(followingPostsData);
          } catch (error) {
            console.log(error.message);
          }
        };
    
        fetchFollowingPosts();
      }, [following, q]);

  return { followigPosts };
}

export default useGetFollowingPosts;