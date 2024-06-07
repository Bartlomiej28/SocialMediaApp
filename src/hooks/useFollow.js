import {useEffect, useState} from 'react'
import { arrayRemove } from 'firebase/firestore';
import {arrayUnion, doc, updateDoc} from 'firebase/firestore';
import { database } from '../utils/database';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userDataActions } from '../store/userData-slice';

function useFollow(userID) {
    
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const currentUserID = useSelector((state) => state.userData.id);
    const following = useSelector((state) => state.userData.following);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleFollow = async() =>{
        setIsUpdating(true)
        try{
            const currentUserRef = doc(database, 'users-extra-info', currentUserID);
            const accountRef = doc(database, 'users-extra-info', userID);

            await updateDoc(currentUserRef,{
                following: isFollowing ? arrayRemove(userID) : arrayUnion(userID)
            })

            await updateDoc(accountRef,{
                followers: isFollowing ? arrayRemove(currentUserID) : arrayUnion(currentUserID)
            });

            
            if (isFollowing) {
                dispatch(userDataActions.unfollow(userID));
                user.following = user.following.filter(item => item !== userID);
                localStorage.setItem('user', JSON.stringify(user));
                setIsFollowing(false);
            }else{
                dispatch(userDataActions.follow(userID));
                user.following = [...user.following, userID];
                localStorage.setItem('user', JSON.stringify(user));
                setIsFollowing(true); 
              }
            

        }catch(error){
            console.log(error.message);
        }finally{
            setIsUpdating(false);
        }
    }

    useEffect(()=>{
        if(currentUserID){
            const isFollowing = following.includes(userID);
            setIsFollowing(isFollowing)
        }
    },[currentUserID, userID, following])

    return {isUpdating, isFollowing, handleFollow}
}

export default useFollow






/*
    const handleFollow = async() =>{
        const currentUserRef = doc(database, 'users-extra-info', currentUser);
        const accountRef = doc(database, 'users-extra-info', userID);
        try{
            await updateDoc(currentUserRef,{
                following: arrayUnion(userID)
            });
            await updateDoc(accountRef,{
                followers: arrayUnion(currentUser)
            });
        }catch(err){
            console.log(err.message)
        }
    }
    */