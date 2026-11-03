import TrendingSongs from "./components/TrendingSongs";
import IPLScores from "./components/IPLScores";
import ErrorHandlingDemo from "./components/ErrorHandlingDemo";

import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>React Fetch API Practice</h1>

      <TrendingSongs />

      <IPLScores />

      <ErrorHandlingDemo />
    </div>
  );
}

export default App;