import { useAuth } from "../AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="page">
      <h1>My Profile</h1>
      <p>Email: {user.email}</p>
      <p>
        Name: {user.displayName || "Name not provided"}
      </p>
    </div>
  );
}

export default Profile;