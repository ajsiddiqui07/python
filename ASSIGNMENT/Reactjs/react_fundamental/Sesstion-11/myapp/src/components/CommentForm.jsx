import { useState } from "react";
import axios from "axios";

function CommentForm() {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [submittedComment, setSubmittedComment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSubmittedComment(null);

    if (!username.trim() || !comment.trim()) {
      setError("Please enter your username and comment.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/comments",
        {
          username: username.trim(),
          comment: comment.trim(),
        }
      );

      setSubmittedComment(response.data);
      setUsername("");
      setComment("");
    } catch (err) {
      setError("Failed to submit comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2>Submit a Comment</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          rows="4"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Comment"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {submittedComment && (
        <div className="response-box">
          <h3>API Response</h3>
          <p>
            <strong>Username:</strong> {submittedComment.username}
          </p>
          <p>
            <strong>Comment:</strong> {submittedComment.comment}
          </p>
          <p>
            <strong>Response ID:</strong> {submittedComment.id}
          </p>
        </div>
      )}
    </section>
  );
}

export default CommentForm;