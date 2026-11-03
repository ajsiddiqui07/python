import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { theme } = useTheme();

  return (
    <nav className={`navbar ${theme}`}>
      <h2>InstaThemeDemo</h2>

      <span>
        Current Theme: {theme}
      </span>
    </nav>
  );
}

export default Navbar;