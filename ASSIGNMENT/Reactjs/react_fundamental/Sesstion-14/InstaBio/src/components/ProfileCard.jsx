import React from "react";

function ProfileCard({ name, imageUrl, bio }) {
  return (
    <div className="profile-card">
      <img
        src={imageUrl}
        alt={`${name}'s profile`}
        className="profile-image"
      />

      <h2>{name}</h2>
      <p>{bio}</p>
    </div>
  );
}

export default ProfileCard;