import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function SignUp({ onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      setMessage("Registration successful!");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setMessage("This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        setMessage("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        setMessage("Password must be at least 6 characters.");
      } else {
        setMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card">
      <h2>Create Account</h2>
      <p>Register using your email and password.</p>

      <form onSubmit={handleSignUp}>
        <label htmlFor="signup-email">Email</label>
        <input
          id="signup-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />

        <label htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          minLength={6}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      {message && <p className="status-message">{message}</p>}

      <p>
        Already registered?{" "}
        <button
          type="button"
          className="text-button"
          onClick={onSwitchToLogin}
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default SignUp;