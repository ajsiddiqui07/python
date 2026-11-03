import { useReducer } from "react";

const initialState = {
  count: 0,
};

function playlistReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };

    case "DECREMENT":
      return {
        ...state,
        count: Math.max(0, state.count - 1),
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

function PlaylistCounter() {
  const [state, dispatch] = useReducer(
    playlistReducer,
    initialState
  );

  return (
    <div className="counter-card">
      <h2>Playlist Counter</h2>

      <p>
        Number of songs: <strong>{state.count}</strong>
      </p>

      <div className="button-group">
        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
        >
          + Add Song
        </button>

        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          disabled={state.count === 0}
        >
          - Remove Song
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

export default PlaylistCounter;