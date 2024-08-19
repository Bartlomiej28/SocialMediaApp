import {useState} from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {setDoc, doc  } from 'firebase/firestore';
import { database } from '../utils/database';

function useSignUpWithGoogle() {
    const googleProvider = new GoogleAuthProvider();
    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
    const [isRegisteredWithGoogle, setIsRegisteredWithGoogle] = useState(false)
    let auth = getAuth();
    const navigation = useNavigate();

    const handleSignUpWithGoogle = async() =>{
        setIsLoadingGoogle(true)
        await signInWithPopup(auth,googleProvider)
            .then((response) =>{
                console.log(response.user);
                const {displayName, email, photoURL, uid} = response.user;

                const userData = {
                    id: uid,
                    photoURL: photoURL,
                    displayName: displayName,
                    email: email,
                    likedPosts: [],
                    following: [],
                    followers: [],
                    diagram: ''
                }
                setDoc(doc(database, 'users-extra-info', uid), userData)
                setIsLoadingGoogle(false)
                setIsRegisteredWithGoogle(true)
                navigation('/');
            })
            .catch((err) => alert(err.message));
    }
    return {isLoadingGoogle, isRegisteredWithGoogle, handleSignUpWithGoogle}
}

export default useSignUpWithGoogle