import useLikeButton from "../hooks/useLikeButton";

function PostCard({ username, caption, initialLikes = 0 }) {
  const { isLiked, likes, toggleLike } =
    useLikeButton(initialLikes);

  return (
    <div className="card post-card">
      <h3>{username}</h3>

      <p>{caption}</p>

      <button
        type="button"
        onClick={toggleLike}
        className={isLiked ? "liked-button" : "like-button"}
        aria-pressed={isLiked}
      >
        {isLiked ? "❤️ Liked" : "🤍 Like"}
      </button>

      <p>
        {likes} {likes === 1 ? "like" : "likes"}
      </p>
    </div>
  );
}

export default PostCard;