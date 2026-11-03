import { useState } from "react";

function useLikeButton(initialLikes = 0) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  function toggleLike() {
    if (isLiked) {
      setLikes((previousLikes) => previousLikes - 1);
      setIsLiked(false);
    } else {
      setLikes((previousLikes) => previousLikes + 1);
      setIsLiked(true);
    }
  }

  return {
    isLiked,
    likes,
    toggleLike,
  };
}

export default useLikeButton;