import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

function DeepChild() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`deep-child ${theme}`}>
      <h3>Deepest Child Component</h3>
      <p>Current theme from Context: {theme}</p>
    </div>
  );
}

export default DeepChild;