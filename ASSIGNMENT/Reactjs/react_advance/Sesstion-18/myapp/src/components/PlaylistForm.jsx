import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const playlistSchema = Yup.object({
  playlistName: Yup.string()
    .trim()
    .required("Playlist name is required"),

  description: Yup.string(),

  genre: Yup.string()
    .required("Please select a genre"),
});

function PlaylistForm() {
  const [createdPlaylist, setCreatedPlaylist] = useState(null);

  return (
    <section className="form-card">
      <h2>🎵 Create Your Playlist</h2>

      <Formik
        initialValues={{
          playlistName: "",
          description: "",
          genre: "",
        }}
        validationSchema={playlistSchema}
        onSubmit={(values, { resetForm }) => {
          setCreatedPlaylist(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="playlistName">
              Playlist Name *
            </label>

            <Field
              id="playlistName"
              name="playlistName"
              type="text"
              placeholder="e.g. My Favorite Songs"
            />

            {touched.playlistName && errors.playlistName && (
              <p className="error">{errors.playlistName}</p>
            )}

            <label htmlFor="description">
              Description (Optional)
            </label>

            <Field
              as="textarea"
              id="description"
              name="description"
              placeholder="Describe your playlist"
              rows="4"
            />

            {touched.description && errors.description && (
              <p className="error">{errors.description}</p>
            )}

            <label htmlFor="genre">Genre *</label>

            <Field as="select" id="genre" name="genre">
              <option value="">Select a genre</option>
              <option value="Pop">Pop</option>
              <option value="Rock">Rock</option>
              <option value="Hip-Hop">Hip-Hop</option>
              <option value="Classical">Classical</option>
              <option value="Jazz">Jazz</option>
              <option value="Bollywood">Bollywood</option>
            </Field>

            {touched.genre && errors.genre && (
              <p className="error">{errors.genre}</p>
            )}

            <button type="submit">Create Playlist</button>
          </Form>
        )}
      </Formik>

      {createdPlaylist && (
        <div className="result">
          <h3>Playlist Created Successfully!</h3>

          <p>
            <strong>Name:</strong> {createdPlaylist.playlistName}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {createdPlaylist.description || "No description provided"}
          </p>

          <p>
            <strong>Genre:</strong> {createdPlaylist.genre}
          </p>
        </div>
      )}
    </section>
  );
}

export default PlaylistForm;