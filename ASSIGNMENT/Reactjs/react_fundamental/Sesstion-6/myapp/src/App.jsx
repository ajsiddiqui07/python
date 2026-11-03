import './App.css';

// Question 1: Playlist Component
function Playlist({ songs }) {
  return (
    <div className="card">
      <h2>My Playlist 🎵</h2>

      <ul>
        {songs.map((song, index) => (
          <li key={index}>
            <strong>{song.title}</strong> — {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Question 2: OrderStatus Component
function OrderStatus({ isDelivered }) {
  return (
    <div className="card">
      <h2>Order Status 📦</h2>

      <p>
        {isDelivered
          ? 'Order Delivered 🎉'
          : 'Order on the way 🚚'}
      </p>
    </div>
  );
}

// Question 3: FollowerList Component
function FollowerList({ followers }) {
  return (
    <div className="card">
      <h2>Follower List 👥</h2>

      {followers.length > 0 ? (
        <ul>
          {followers.map((username, index) => (
            <li key={username + index}>{username}</li>
          ))}
        </ul>
      ) : (
        <p>No followers yet</p>
      )}
    </div>
  );
}

// Question 4: CartSummary Component
function CartSummary({ items }) {
  return (
    <div className="card">
      <h2>Shopping Cart 🛒</h2>

      {items.length > 0 ? (
        <>
          <ul>
            {items.map((item, index) => (
              <li key={item.name + index}>
                {item.name} — ₹{item.price}
              </li>
            ))}
          </ul>

          <h3>
            Total: ₹
            {items.reduce((sum, item) => sum + item.price, 0)}
          </h3>
        </>
      ) : (
        <p>Cart is empty</p>
      )}

      {items.length >= 3 && (
        <button type="button">Checkout Now</button>
      )}
    </div>
  );
}

// Main App Component
function App() {
  const songs = [
    { title: 'Perfect', artist: 'Ed Sheeran' },
    { title: 'Shape of You', artist: 'Ed Sheeran' },
    { title: 'Believer', artist: 'Imagine Dragons' },
  ];

  const followers = ['Arbaz', 'Rahul', 'Aman'];

  const cartItems = [
    { name: 'Headphones', price: 1500 },
    { name: 'Keyboard', price: 2000 },
    { name: 'Mouse', price: 500 },
  ];

  const emptyCart = [];

  return (
    <div className="App">
      <h1>React Lists and Conditional Rendering</h1>

      {/* Question 1 */}
      <Playlist songs={songs} />

      {/* Question 2 */}
      <OrderStatus isDelivered={true} />
      <OrderStatus isDelivered={false} />

      {/* Question 3 */}
      <FollowerList followers={followers} />
      <FollowerList followers={[]} />

      {/* Question 4 */}
      <CartSummary items={cartItems} />
      <CartSummary items={emptyCart} />
    </div>
  );
}

export default App;