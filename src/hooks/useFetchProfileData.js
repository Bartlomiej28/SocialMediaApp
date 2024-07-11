import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { database } from '../utils/database';

function useFetchProfileData(profileId) {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const snap = await getDoc(doc(database, 'users-extra-info', profileId));
        if (snap.exists()) {
          setProfileData(snap.data());
        } else {
          console.log('No data found for profile ID:', profileId);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [profileId]);

  return { profileData, isLoading };
}

export default useFetchProfileData;
