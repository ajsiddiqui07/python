import { createContext } from "react";

const NotificationContext = createContext({
  count: 0,
  setCount: () => {},
});

export default NotificationContext;