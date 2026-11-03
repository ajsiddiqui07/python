import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

function ThemeDemo() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <section className={`theme-box ${theme}`}>
      <h2>Theme Switcher</h2>

      <p>Current Theme: {theme}</p>

      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Theme
      </button>
    </section>
  );
}

export default ThemeDemo;