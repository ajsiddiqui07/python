import { useTheme } from "../context/ThemeContext";

function PostCard() {
  const { theme } = useTheme();

  return (
    <article className={`post-card ${theme}`}>
      <h3>My First Instagram Post 📸</h3>

      <p>
        Learning React Context API and building reusable components!
      </p>

      <button className="like-button">
        ❤️ Like
      </button>

      <p className="theme-label">
        Post Theme: {theme}
      </p>
    </article>
  );
}

export default PostCard;