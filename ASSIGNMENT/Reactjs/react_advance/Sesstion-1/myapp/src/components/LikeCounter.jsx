import { useState } from "react";

function LikeCounter() {
  const [likes, setLikes] = useState(0);

  function handleLike() {
    setLikes((previousLikes) => previousLikes + 1);
  }

  return (
    <div className="like-card">
      <h2>Instagram Post ❤️</h2>

      <p>Likes: {likes}</p>

      <button onClick={handleLike}>
        ❤️ Like
      </button>
    </div>
  );
}

export default LikeCounter;
