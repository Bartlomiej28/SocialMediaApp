import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { database} from '../utils/database';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {query, where, collection, getDocs, } from 'firebase/firestore';

function useSignInWithGoogle() {
    const [isLoadingG, setIsLoadingG] = useState(false);
    const googleProvider = new GoogleAuthProvider();
    const collectionRef = collection(database, 'users-extra-info');
    const navigation = useNavigate();
    let auth = getAuth();
    

    const handleSignInWithGoogle = async() =>{
        await signInWithPopup(auth, googleProvider)
            
            .then((response) =>{
                console.log(response.user);
                const displayNameQuery = query(collectionRef, where("email", "==", response.user.email));

                getDocs(displayNameQuery)
                    .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const userData = doc.data()
                        localStorage.setItem('user', JSON.stringify(userData));
                        setIsLoadingG(false);
                        navigation('/home'); 
                        });
                    })
                    .catch((error) => {
                    console.error("Error getting documents: ", error);
                    });
            })
            .catch((err) => alert(err.message));
    }
    return{isLoadingG, handleSignInWithGoogle}
}

export default useSignInWithGoogle