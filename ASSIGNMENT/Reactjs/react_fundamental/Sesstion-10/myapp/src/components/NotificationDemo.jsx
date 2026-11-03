import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";

function NotificationDemo() {
  const { count, setCount } = useContext(NotificationContext);

  return (
    <section className="notification-box">
      <h2>Notification Demo</h2>

      <p>
        You have <strong>{count}</strong> unread messages.
      </p>

      <button onClick={() => setCount((previous) => previous + 1)}>
        Receive Message
      </button>

      <button
        onClick={() => setCount(0)}
        disabled={count === 0}
      >
        Mark All as Read
      </button>
    </section>
  );
}

export default NotificationDemo;