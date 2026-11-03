import { useReducer } from "react";

const initialQuantity = {
  quantity: 1,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        quantity: state.quantity + 1,
      };

    case "DECREMENT":
      return {
        ...state,
        quantity: Math.max(0, state.quantity - 1),
      };

    case "RESET":
      return initialQuantity;

    default:
      return state;
  }
}

function CartItem() {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialQuantity
  );

  const price = 499;
  const totalPrice = price * state.quantity;

  return (
    <div className="counter-card">
      <h2>Shopping Cart</h2>

      <div className="product-info">
        <div className="product-image">📦</div>

        <div>
          <h3>Wireless Headphones</h3>
          <p>Price: ₹{price}</p>
        </div>
      </div>

      <p>
        Quantity: <strong>{state.quantity}</strong>
      </p>

      <p>
        Total Price: <strong>₹{totalPrice}</strong>
      </p>

      <div className="button-group">
        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
        >
          +
        </button>

        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          disabled={state.quantity === 0}
        >
          -
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

export default CartItem;