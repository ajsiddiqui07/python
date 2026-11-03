import PlaylistCounter from "./components/PlaylistCounter";
import CartItem from "./components/CartItem";
import { useReducer } from "react";

const initialCount = 0;

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;

    case "DECREMENT":
      return Math.max(0, state - 1);

    case "RESET":
      return initialCount;

    default:
      return state;
  }
}

function RefactoredCounter() {
  const [count, dispatch] = useReducer(
    counterReducer,
    initialCount
  );

  return (
    <div className="counter-card">
      <h2>Refactored Counter</h2>

      <p>
        Count: <strong>{count}</strong>
      </p>

      <div className="button-group">
        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
        >
          Increment
        </button>

        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          disabled={count === 0}
        >
          Decrement
        </button>

        <button
          onClick={() => dispatch({ type: "RESET" })}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <main className="app-container">
      <h1>React useReducer Practice</h1>

      <PlaylistCounter />

      <CartItem />

      <RefactoredCounter />
    </main>
  );
}

export default App;