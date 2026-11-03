import LoginForm from "./components/LoginForm";
import PlaylistForm from "./components/PlaylistForm";

function App() {
  return (
    <main className="app">
      <h1>Formik & Yup Practice</h1>

      <LoginForm />

      <PlaylistForm />
    </main>
  );
}

export default App;