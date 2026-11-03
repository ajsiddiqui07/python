import { Profiler } from "react";
import ProductList from "./components/ProductList";
import PlaylistManager from "./components/PlaylistManager";
import LargeList from "./components/LargeList";
import "./App.css";

function handleProfilerRender(
  id,
  phase,
  actualDuration,
  baseDuration
) {
  console.log("Component:", id);
  console.log("Phase:", phase);
  console.log("Actual Duration:", actualDuration);
  console.log("Base Duration:", baseDuration);
}

function App() {
  return (
    <div>
      <h1>React Performance Demo</h1>

      <Profiler
        id="ProductList"
        onRender={handleProfilerRender}
      >
        <ProductList />
      </Profiler>

      <PlaylistManager />

      <LargeList />
    </div>
  );
}

export default App;