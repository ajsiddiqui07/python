import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  if (isLoggedIn) {
    return (
      <section className="login-card">
        <h2>Welcome! 🎉</h2>
        <p>You have successfully logged in.</p>
        <p>Email: {email}</p>

        <button onClick={handleLogout}>Logout</button>
      </section>
    );
  }

  return (
    <section className="login-card">
      <h2>Login to PlaylistManager</h2>

      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>

        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Password</label>

        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default LoginForm;