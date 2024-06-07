import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import MiniPost from './MiniPost'
import { getDoc, doc } from 'firebase/firestore';
import { database } from '../utils/database';

function Liked() {
  const likedPosts = useSelector((state) => state.userData.likedPosts);
  const [likedPostsData, setLikedPostsData] = useState([]);

  useEffect(() => {
    const fetchLikedPostsData = async () => {
      const data = [];

      for (const postID of likedPosts) {
        const postRef = doc(database, 'tiktoks', postID);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
          data.push({
            id: postID,
            filePath: postSnap.data().filePath,
            postedBy: postSnap.data().postedBy
          });
        } else {
          console.log('Brak danych dla postu o ID:', postID);
        }
      }

      setLikedPostsData(data);
    };

    fetchLikedPostsData();
  }, [likedPosts]);

  console.log(likedPostsData)

  return (
    <div>
      {likedPostsData.map((post) =>(
        <MiniPost id={post.id} filePath={post.filePath} postedBy={post.postedBy}/>
      ))}
    </div>
  )
}

export default Liked