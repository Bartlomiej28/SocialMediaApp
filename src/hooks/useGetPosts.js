import { useEffect, useState } from 'react';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import { database } from '../utils/database';

function useGetTikToks() {
  const [isLoading, setIsLoading] = useState(false);
  const [tiktoks, setTikToks] = useState([]);
  const collectionRef = collection(database, 'tiktoks');
  const q = query(collectionRef, orderBy('createdAt', 'desc')); 

  useEffect(() => {
    const fetchTikToks = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(q);
        const tiktoksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setTikToks(tiktoksData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTikToks();
  }, []);

  return { isLoading, tiktoks };
}

export default useGetTikToks;