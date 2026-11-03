import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <p>Checking login status...</p>;
  }

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (err) {
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;