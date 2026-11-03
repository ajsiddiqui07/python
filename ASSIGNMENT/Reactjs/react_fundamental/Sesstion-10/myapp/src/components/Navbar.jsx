import { useContext } from "react";
import UserContext from "../contexts/UserContext";

function Navbar() {
  const user = useContext(UserContext);

  return (
    <nav className="navbar">
      <h2>My React App</h2>

      <div>
        <span>Welcome, {user.username}</span>
        <span className="login-status">
          {user.loggedIn ? "Logged In" : "Logged Out"}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;