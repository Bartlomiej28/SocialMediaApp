import { useState, useEffect } from 'react'
import {database} from '../utils/database';
import { collection, query, where, getDocs } from 'firebase/firestore';

function useSearch(searchItem) {
    const [isLoading, setIsLoading] = useState(false);
    const [tiktoks, setTikToks] = useState([])
    const collectionRef = collection(database, 'tiktoks');


    useEffect(()=>{
        const fetchPosts = async() =>{
            setIsLoading(true);
            const categoryQuery = query(collectionRef, where('category', 'array-contains', searchItem));
            const contentQuery = query(collectionRef, where('content', 'array-contains', searchItem));
            const categorySnapshot = await getDocs(categoryQuery);
            const contentSnapshot = await getDocs(contentQuery);

            const tiktoksByCategoryData = categorySnapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data() 
              }));

              const tiktoksByContentData = contentSnapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data() 
              }));

              setTikToks([...tiktoksByCategoryData, ...tiktoksByContentData]);
              setIsLoading(false)
        }
        fetchPosts();
    },[searchItem])
    return {isLoading, tiktoks}
}

export default useSearch