import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { doc, setDoc} from 'firebase/firestore'
import {database} from '../utils/database';
import { useState } from 'react';

function useSignUpWithEmailAndPassword(email, password) {
    const [isLoadingEmailPassword, setIsLoadingEmailPassword] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false);

    let auth = getAuth();
    const navigation = useNavigate();

    const handleSignUp = async () =>{
        setIsLoadingEmailPassword(true)
        await createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((response) =>{
                console.log(response.user);
                const {email, uid} = response.user;

                const userData = {
                    id: uid,
                    photoURL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                    displayName: uid,
                    email: email,
                    likedPosts: [],
                    following: [],
                    followers: [],
                    diagram: ''
                }

                setDoc(doc(database, 'users-extra-info',uid),userData)
                setIsLoadingEmailPassword(false)
                setIsRegistered(true)
                navigation('/');
            })
            .catch((err) => console.log(err.message));
    }
    return {isLoadingEmailPassword, isRegistered, handleSignUp}
}

export default useSignUpWithEmailAndPassword