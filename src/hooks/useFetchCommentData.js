import {useEffect, useState} from 'react'
import { database } from '../utils/database';
import { getDoc, doc } from 'firebase/firestore';

function useFetchCommentData(postedBy) {
    const [isLoading, setIsLoading] = useState(false);
    const [authorData, setAuthorData] = useState([]);

    useEffect(()=>{
        const fetchAuthorData = async() =>{
            setIsLoading(true);
            const snap = await getDoc(doc(database, 'users-extra-info', postedBy));
            const authorInformations = snap.data();
            try{
                setAuthorData(authorInformations);
            }
            catch(err){
                console.log(err);
            }
            finally{
                setIsLoading(false)
            }
        }
        fetchAuthorData();
    },[])

    return {isLoading, authorData};
}

export default useFetchCommentData