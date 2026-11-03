import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login({ onSwitchToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
    } catch (error) {
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setErrorMessage("Invalid email or password.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("Please enter a valid email address.");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <p>Welcome back!</p>

      <form onSubmit={handleLogin}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {errorMessage && (
        <p className="error-message" role="alert">
          {errorMessage}
        </p>
      )}

      <p>
        Don't have an account?{" "}
        <button
          type="button"
          className="text-button"
          onClick={onSwitchToSignUp}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default Login;