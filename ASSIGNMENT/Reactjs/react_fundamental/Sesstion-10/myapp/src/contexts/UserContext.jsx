import { createContext } from "react";

const UserContext = createContext({
  username: "Guest",
  loggedIn: false,
});

export default UserContext;