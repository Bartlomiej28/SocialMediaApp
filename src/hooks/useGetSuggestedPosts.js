import {useState, useEffect} from 'react'
import { database } from '../utils/database';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';

function useGetSuggestedPosts() {
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [suggestedPosts, setSuggestedPosts] = useState([])
  const following = useSelector((state)=> state.userData.following);
  const likedPosts = useSelector((state)=> state.userData.likedPosts);
  const id = useSelector((state)=> state.userData.id);

    useEffect(() => {
        const getSuggestedPosts = async() =>{
            setIsLoadingPosts(true);
            try{
                const usersRef = collection(database, "tiktoks");
                const q = query(
                    usersRef,
                    where('postedBy', 'not-in', [id,...following]))
                 
            const querySnapshot = await getDocs(q)
            const posts = [];
            querySnapshot.forEach(doc =>{
                posts.push({id: doc.id, data: doc.data()})
            })
            setSuggestedPosts(posts)


            }catch(error){
                console.log(error.message);
            }finally{
                setIsLoadingPosts(false)
            }
        }
        getSuggestedPosts();
    },[following])

  return {isLoadingPosts, suggestedPosts}
}

export default useGetSuggestedPosts