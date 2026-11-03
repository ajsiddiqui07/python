import { useState } from 'react';
import './App.css';

// Question 1: LikeButton Component
function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <div className="card">
      <h2>Like Button</h2>

      <button
        className="like-button"
        onClick={() => setLikes(likes + 1)}
      >
        ❤️ {likes}
      </button>

      <p>Click the heart to like!</p>
    </div>
  );
}

// Question 2: CartItem Component
function CartItem() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="card">
      <h2>Shopping Cart</h2>

      <h3>Wireless Headphones</h3>

      <div className="quantity-controls">
        <button
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity === 1}
        >
          -
        </button>

        <span>{quantity}</span>

        <button onClick={() => setQuantity(quantity + 1)}>
          +
        </button>
      </div>

      <p>Quantity: {quantity}</p>
    </div>
  );
}

// Question 3: SongVote Component
function SongVote() {
  const [votes, setVotes] = useState(0);

  return (
    <div className="card">
      <h2>Song Voting</h2>

      <h3>Perfect - Ed Sheeran</h3>

      <div className="vote-controls">
        <button onClick={() => setVotes(votes + 1)}>
          ⬆ Upvote
        </button>

        <span className="vote-count">{votes}</span>

        <button
          onClick={() => setVotes(Math.max(0, votes - 1))}
          disabled={votes === 0}
        >
          ⬇ Downvote
        </button>
      </div>

      <p>Current votes: {votes}</p>
    </div>
  );
}

// Question 4: RatingSelector Component
function RatingSelector() {
  const [rating, setRating] = useState(0);

  return (
    <div className="card">
      <h2>Rate Your Experience</h2>

      <p>Zomato-style Rating</p>

      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={star <= rating ? 'star selected' : 'star'}
            onClick={() => setRating(star)}
            aria-label={`Rate ${star} out of 5 stars`}
          >
            ★
          </button>
        ))}
      </div>

      <p>
        Your rating: {rating} / 5
      </p>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <div className="App">
      <h1>React useState Practice</h1>

      <LikeButton />

      <CartItem />

      <SongVote />

      <RatingSelector />
    </div>
  );
}

export default App;