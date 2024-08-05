import { arrayUnion, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function useSendComment(tiktokRef, newCommentContent) {
  const [isSendingLoading, setIsSendingLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const currentUser = useSelector((state) => state.userData.id);

  async function addComment() {
    setIsSendingLoading(true);
    const newComment = {
      postedBy: currentUser,
      commentContent: newCommentContent.current.value,
    };

    try {
      await updateDoc(tiktokRef, {
        comments: arrayUnion(newComment),
      });
      setSuccess(true);
    } catch (error) {
      console.error('Error adding comment: ', error);
      setSuccess(false);
    } finally {
      setIsSendingLoading(false);
    }
  }

  const handleSendNewComment = async () => {
    try {
      await addComment();
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return { isSendingLoading, success, handleSendNewComment };
}

export default useSendComment;
