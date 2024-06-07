import {useState, useEffect} from 'react'
import { getDoc, doc } from 'firebase/firestore';
import { database } from '../utils/database';

function useFetchComments(tiktokId) {
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        
        const fetchComments = async() =>{
            setIsLoading(true);
            const snap = await getDoc(doc(database, 'tiktoks', tiktokId))
            const allCommenst = snap.data().comments
            try{
                setComments(allCommenst);
            }
            catch(err){
                console.log(err);
            } 
            setIsLoading(false);
        }
        fetchComments();
     }, []);

    return{isLoading, comments}
}

export default useFetchComments






/*
    useEffect(() => {
        const fetchComments = async() =>{
            const snap = await getDoc(doc(database, 'tiktoks', tiktokId))
            const allCommenst = snap.data().comments
            try{
                setComments(allCommenst);
            }
            catch(err){
                console.log(err);
            } 
        }
        fetchComments();
     }, []);
     */