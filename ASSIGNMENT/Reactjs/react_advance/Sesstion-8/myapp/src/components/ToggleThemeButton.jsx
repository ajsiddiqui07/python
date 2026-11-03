import { useTheme } from "../context/ThemeContext";

function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-button" onClick={toggleTheme}>
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}

export default ToggleThemeButton;