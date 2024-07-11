import { useEffect, useState } from 'react';
import { doc, getDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { database } from '../utils/database';

function useAccountData(userID) {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [accountData, setAccountData] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchAccountData = async () => {
      setIsLoadingData(true);
      try {
        const snap = await getDoc(doc(database, 'users-extra-info', userID));
        if (snap.exists()) {
          setAccountData(snap.data());
        }
      } catch (error) {
        console.error('Error fetching account data: ', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    const fetchUserPosts = async () => {
      setIsLoadingPosts(true);
      try {
        const collectionRef = collection(database, 'tiktoks');
        const q = query(collectionRef, where('postedBy', '==', userID));
        const querySnapshot = await getDocs(q);
        const authorPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setUserPosts(authorPosts);
      } catch (error) {
        console.error('Error fetching user posts: ', error);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchAccountData();
    fetchUserPosts();
  }, [userID]);

  return { isLoadingData, accountData, userPosts, isLoadingPosts };
}

export default useAccountData;
