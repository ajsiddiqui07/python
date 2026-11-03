import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Flipkart Store</div>

      <div className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/deals"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Deals
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Cart
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;