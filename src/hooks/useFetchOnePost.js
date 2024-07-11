import { useState, useEffect } from 'react';
import { database } from '../utils/database';
import { getDoc, doc } from 'firebase/firestore';

function useFetchOnePost(id) {
  const [isLoading, setIsLoading] = useState(true);
  const [tiktok, setTikTok] = useState(null);

  useEffect(() => {
    const fetchTiktokData = async () => {
      setIsLoading(true);
      try {
        const snap = await getDoc(doc(database, 'tiktoks', id));
        if (snap.exists()) {
          setTikTok(snap.data());
        }
      } catch (error) {
        console.error('Error fetching TikTok data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTiktokData();
  }, [id]);

  return { isLoading, tiktok };
}

export default useFetchOnePost;
