import {useState, useEffect} from 'react'
import { getDoc, doc } from 'firebase/firestore';
import { database } from '../utils/database';

function useFetchComments(tiktokId) {
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        const fetchComments = async() =>{
            setIsLoading(true);
            try{
                const snap = await getDoc(doc(database, 'tiktoks', tiktokId))
                const allCommenst = snap.data().comments
                setComments(allCommenst);
            }
            catch(err){
                console.log(err);
            } 
            finally{
                setIsLoading(false);
            }
        }
        fetchComments();
     }, [tiktokId]);

    return{isLoading, comments}
}

export default useFetchComments
