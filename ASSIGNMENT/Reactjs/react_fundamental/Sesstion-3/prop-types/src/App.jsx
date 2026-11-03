import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

// Question 1: ProductCard Component
function ProductCard({ productName, price }) {
  return (
    <div className="product-card">
      <h2>{productName}</h2>
      <p>Price: ₹{price}</p>
    </div>
  );
}

// Question 4: Prop Type Validation
ProductCard.propTypes = {
  productName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

// Question 2 and 3: UserProfile Component
function UserProfile({ username, followers, profilePic }) {
  return (
    <div className="profile-card">
      <img
        src={profilePic}
        alt={`${username}'s profile`}
        className="profile-picture"
      />

      <h2>{username}</h2>

      <p>
        <strong>{followers}</strong> Followers
      </p>

      <button type="button">Follow</button>
    </div>
  );
}

// Question 3: Default Props
UserProfile.defaultProps = {
  followers: 0,
  profilePic: 'https://i.pravatar.cc/150?img=12',
};

// Main App Component
function App() {
  return (
    <div className="App">
      <h1>React Props Assignment</h1>

      {/* Question 1: ProductCard */}
      <section>
        <h2>Product Card</h2>

        <ProductCard
          productName="Wireless Headphones"
          price={1999}
        />
      </section>

      <hr />

      {/* Question 2 and 3: UserProfile with all props */}
      <section>
        <h2>User Profile</h2>

        <UserProfile
          username="Arbaz Siddiqui"
          followers={1200}
          profilePic="https://i.pravatar.cc/150?img=12"
        />
      </section>

      <hr />

      {/* Question 3: UserProfile using default props */}
      <section>
        <h2>Profile with Default Props</h2>

        <UserProfile username="Guest User" />
      </section>
    </div>
  );
}

export default App;