import React from 'react';
import './App.css';

// Question 2: Functional Component
function UserGreeting(props) {
  return <h2>Hello, {props.username}!</h2>;
}

// Question 3: Class Component
class UserGreetingClass extends React.Component {
  render() {
    return <h2>Hello, {this.props.username}!</h2>;
  }
}

// Questions 4 and 5: MiniProfile Functional Component
function MiniProfile() {
  return (
    <div className="profile-card">
      <img
        src="https://i.pravatar.cc/150?img=12"
        alt="Profile picture"
        className="profile-picture"
      />

      <h2>Arbaz Siddiqui</h2>

      <p className="status">
        Learning React and building amazing projects!
      </p>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <div className="App">
      {/* Question 1: JSX Heading */}
      <h1>Welcome to React JSX!</h1>

      <hr />

      {/* Question 2: Functional Component */}
      <section>
        <h2>Functional Component</h2>
        <UserGreeting username="Arbaz Siddiqui" />
      </section>

      <hr />

      {/* Question 3: Class Component */}
      <section>
        <h2>Class Component</h2>
        <UserGreetingClass username="Arbaz Siddiqui" />
      </section>

      <hr />

      {/* Questions 4 and 5: Mini Profile */}
      <section>
        <h2>My Mini Profile</h2>
        <MiniProfile />
      </section>
    </div>
  );
}

export default App;