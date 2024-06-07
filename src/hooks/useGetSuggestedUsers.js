import {useState, useEffect} from 'react'
import { database } from '../utils/database';
import { collection, limit, orderBy, query, where, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';

function useGetSuggestedUsers() {
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const following = useSelector((state)=> state.userData.following);
  const id = useSelector((state) => state.userData.id);
  
    useEffect(() => {
        const getSuggestedUsers = async() =>{
            setIsLoading(true);
            try{
                const usersRef = collection(database, "users-extra-info");
                const q = query(
                    usersRef,
                    where('id', 'not-in', [id, ...following])
                )
            
            const querySnapshot = await getDocs(q)
            const users = [];
            querySnapshot.forEach(doc =>{
                users.push({id: doc.id})
            })
            setSuggestedUsers(users)


            }catch(error){
                console.log(error.message);
            }finally{
                setIsLoading(false)
            }
        }
        getSuggestedUsers();
    },[following])
  return {isLoading, suggestedUsers}
}

export default useGetSuggestedUsers