import {useState, useEffect} from 'react'
import { database } from '../utils/database';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux';
import { userDataActions } from '../store/userData-slice';


function useTikTokFunctions(publishedBy, tiktokId) {
    const [isLoading, setIsLoading] = useState(false);
    const [authorData, setAuthorData] = useState([])

    const currentUserID = useSelector((state) => state.userData.id);
    
    const [isLiked, setIsLiked] = useState(false);
    const likedPosts = useSelector((state) => state.userData.likedPosts)
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAuthorData = async() =>{
            setIsLoading(true);
            try{
                const snap = await getDoc(doc(database, 'users-extra-info', publishedBy));
                if(snap.exists()){
                    setAuthorData(snap.data());
                }
            }catch(error){
                console.log(error.message);
            }
            setIsLoading(false)
        }
        fetchAuthorData();


    },[publishedBy]);



    const handleLike = async() => {
        try {
            const currentUserRef = doc(database, 'users-extra-info', currentUserID);
            const tiktokRef = doc(database, 'tiktoks', tiktokId);
    
            await updateDoc(currentUserRef, {
                likedPosts: isLiked ? arrayRemove(tiktokId) : arrayUnion(tiktokId)
            });
    
            await updateDoc(tiktokRef, {
                likedBy: isLiked ? arrayRemove(currentUserID) : arrayUnion(currentUserID)
            });
    
           
            if (isLiked) {
                dispatch(userDataActions.unlike(tiktokId));
                const user = JSON.parse(localStorage.getItem('user'));
                user.likedPosts = user.likedPosts.filter(item => item !== tiktokId);
                localStorage.setItem('user', JSON.stringify(user));
                setIsLiked(false);
            } else {
                dispatch(userDataActions.like(tiktokId));
                const user = JSON.parse(localStorage.getItem('user'));
                user.likedPosts.push(tiktokId);
                localStorage.setItem('user', JSON.stringify(user));
                setIsLiked(true);
            }
            
        } catch(error) {
            console.log(error);
        } finally {
            
        }
    };

    useEffect(()=>{
        if(currentUserID){
            const isLiked = likedPosts.includes(tiktokId);
            setIsLiked(isLiked)
        }
    },[currentUserID, tiktokId, likedPosts])

    return {isLoading, authorData, isLiked, handleLike}
}

export default useTikTokFunctions


/*
useEffect(()=>{
        const fetchAuthorData = async() =>{
            setLoading(true);
            const snap = await getDoc(doc(database, 'users-extra-info', publishedBy));
            if(snap.exists()){
                setAuthorData(snap.data());
            }
            setLoading(false);
        }
        fetchAuthorData();
    },[])
*/