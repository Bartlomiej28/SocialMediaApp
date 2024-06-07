import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { database } from '../utils/database';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {query, where, getDocs, collection } from 'firebase/firestore';


function useSignInWithEmailAndPassword(email, password) {
    const [isLoadingEAP, setIsLoadingEAP] = useState(false);
    let auth = getAuth();
    const navigation = useNavigate();
    const collectionRef = collection(database, 'users-extra-info');

    const handleSignIn = async() =>{
        setIsLoadingEAP(true)
        await signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((response) =>{
                console.log(response.user);
                
                const displayNameQuery = query(collectionRef, where("email", "==", email.current.value));
                getDocs(displayNameQuery)
                    .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const userData = doc.data()
                        
                        localStorage.setItem('user', JSON.stringify(userData));
                        navigation('/home'); 
                    });
                    })
                    .catch((error) => {
                    console.error("Error getting documents: ", error);
                });

            })
            .catch((err)=> alert(err.message));
            setIsLoadingEAP(false)
    }
    return {isLoadingEAP, handleSignIn}
}

export default useSignInWithEmailAndPassword