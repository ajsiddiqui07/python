import LikeButton from "./LikeButton";

function Post() {
  return (
    <div className="post-card">
      <h3>My Latest Post 📸</h3>

      <p>Enjoying my day! Share some love.</p>

      <LikeButton />
    </div>
  );
}

export default Post;