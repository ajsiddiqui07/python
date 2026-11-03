import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import ToggleThemeButton from "./components/ToggleThemeButton";
import Feed from "./components/Feed";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <Navbar />

        <div className="main-content">
          <h1>Welcome to InstaThemeDemo</h1>

          <p>
            Change the theme using the button below.
          </p>

          <ToggleThemeButton />

          <Feed />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;