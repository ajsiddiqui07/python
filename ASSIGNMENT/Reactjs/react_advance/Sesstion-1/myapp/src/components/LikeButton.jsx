import { useState } from "react";
import { useUser } from "../context/UserContext";

function LikeButton() {
  const user = useUser();
  const [liked, setLiked] = useState(false);

  function handleLike() {
    setLiked((previousLiked) => !previousLiked);
  }

  return (
    <div className="like-button-section">
      <p>
        Logged in as: <strong>{user.fullName}</strong>
      </p>

      <button onClick={handleLike}>
        {liked ? "❤️ Liked" : "🤍 Like Post"}
      </button>

      {liked && <p>{user.username} liked this post!</p>}
    </div>
  );
}

export default LikeButton;