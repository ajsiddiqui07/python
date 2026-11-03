import { createContext, useContext } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const user = {
    username: "Arbaz",
    fullName: "Arbaz Siddiqui",
  };

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}