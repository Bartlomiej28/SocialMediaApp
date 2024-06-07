import { arrayUnion, updateDoc } from 'firebase/firestore';
import {useState} from 'react'
import { useSelector } from 'react-redux';

function useSendComment(tiktokRef, newCommentContent) {
    const [isSendingLoading, setIsSendingLoading] = useState(false)
    const [success, setSuccess] = useState(false);
    const currentUser = useSelector((state) => state.userData.id);

    async function addComment (){
        setIsSendingLoading(true);
        const newComment = {
            postedBy: currentUser,
            commentContent: newCommentContent.current.value
        }

        await updateDoc(tiktokRef,{
            comments: arrayUnion(newComment)
        })
        .then(()=>setIsSendingLoading(false))
    }

    const handleSendNewComment = () =>{
        try{
            addComment();
        }
        catch(err){
            console.log(err);
        }
        
    }
    return {isSendingLoading, success, handleSendNewComment}
}

export default useSendComment