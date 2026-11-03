import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase";

function LiveCommentsFeed({ songId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Reset the feed when the selected song changes
    setComments([]);
    setError("");

    if (!songId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const commentsRef = collection(db, "comments");

    const commentsQuery = query(
      commentsRef,
      where("songId", "==", songId)
    );

    // Listen for initial data and subsequent changes
    const unsubscribe = onSnapshot(
      commentsQuery,
      (snapshot) => {
        const commentsList = snapshot.docs.map((commentDoc) => ({
          id: commentDoc.id,
          ...commentDoc.data(),
        }));

        // Newest comments first, using a Firestore Timestamp
        commentsList.sort((a, b) => {
          const timeA = a.createdAt?.toMillis?.() ?? 0;
          const timeB = b.createdAt?.toMillis?.() ?? 0;

          return timeB - timeA;
        });

        setComments(commentsList);
        setLoading(false);
        setError("");
      },
      (err) => {
        console.error("Error listening to comments:", err);
        setError("Unable to load comments. Check Firestore permissions.");
        setLoading(false);
      }
    );

    // Cleanup: stop listening when the component unmounts
    // or when songId changes
    return () => {
      unsubscribe();
    };
  }, [songId]);

  if (loading) {
    return <p>Loading comments...</p>;
  }

  return (
    <section className="card">
      <h2>Live Comments</h2>

      <p>
        Song ID: <strong>{songId || "No song selected"}</strong>
      </p>

      {error && <p className="error-message">{error}</p>}

      {!error && comments.length === 0 && (
        <p>No comments yet for this song.</p>
      )}

      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            <strong>{comment.username || "Anonymous"}</strong>
            <p>{comment.text || ""}</p>

            {comment.createdAt?.toDate && (
              <small>
                {comment.createdAt.toDate().toLocaleString()}
              </small>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LiveCommentsFeed;