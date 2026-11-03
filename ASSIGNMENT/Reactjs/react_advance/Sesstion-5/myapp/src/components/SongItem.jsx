import { useState } from "react";

function SongItem({ song, index, dispatch }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(song.name);

  function handleDelete() {
    dispatch({
      type: "REMOVE_SONG",
      payload: song.id,
    });
  }

  function handleEdit() {
    setEditedName(song.name);
    setIsEditing(true);
  }

  function handleSave(event) {
    event.preventDefault();

    const trimmedName = editedName.trim();

    if (!trimmedName) {
      return;
    }

    dispatch({
      type: "EDIT_SONG",
      payload: {
        id: song.id,
        name: trimmedName,
      },
    });

    setIsEditing(false);
  }

  function handleCancel() {
    setEditedName(song.name);
    setIsEditing(false);
  }

  return (
    <div className="song-item">
      <span className="song-number">
        {index + 1}
      </span>

      <div className="song-details">
        {isEditing ? (
          <form className="edit-form" onSubmit={handleSave}>
            <input
              type="text"
              value={editedName}
              onChange={(event) =>
                setEditedName(event.target.value)
              }
              aria-label={`Edit ${song.name}`}
              autoFocus
            />

            <button type="submit" className="save-button">
              Save
            </button>

            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
        ) : (
          <span className="song-name">
            {song.name}
          </span>
        )}
      </div>

      {!isEditing && (
        <div className="song-actions">
          <button
            type="button"
            className="edit-button"
            onClick={handleEdit}
            aria-label={`Edit ${song.name}`}
          >
            Edit
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={handleDelete}
            aria-label={`Delete ${song.name}`}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default SongItem;