import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>

      <Link to="/" className="home-button">
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;