import {useState, useEffect} from 'react'
import {database} from '../utils/database';
import {getDoc, doc} from 'firebase/firestore';


function useFetchOnePost(id) {
  const [isLoading, setIsLoading] = useState(true);
  const [tiktok, setTikTok] = useState(null)

  useEffect(()=>{
    const fetchTiktokData = async() =>{
      
      setIsLoading(true)
      const snap = await getDoc(doc(database, 'tiktoks', id));
      if(snap.exists()){
        setTikTok(snap.data());
        setIsLoading(false);
      }

    }
    fetchTiktokData();
  },[])


  return {isLoading, tiktok}
}

export default useFetchOnePost


/*

useEffect(()=>{

    const fetchTiktokData = async() =>{
      const snap = await getDoc(doc(database, 'tiktoks', id));
      if(snap.exists()){
        setData(snap.data());
      }

    }
    fetchTiktokData();
  },[])
*/