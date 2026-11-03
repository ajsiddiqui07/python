import { useState } from "react";

import UserContext from "./contexts/UserContext";
import ThemeContext from "./contexts/ThemeContext";
import NotificationContext from "./contexts/NotificationContext";

import Navbar from "./components/Navbar";
import ThemeDemo from "./components/ThemeDemo";
import DeepChild from "./components/DeepChild";
import NotificationDemo from "./components/NotificationDemo";

import "./App.css";

function App() {
  // Question 1 and 2: User Context
  const userValue = {
    username: "Arbaz",
    loggedIn: true,
  };

  // Question 3 and 4: Theme Context
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((previousTheme) =>
      previousTheme === "light" ? "dark" : "light"
    );
  };

  const themeValue = {
    theme,
    toggleTheme,
  };

  // Question 5: Notification Context
  const [count, setCount] = useState(0);

  const notificationValue = {
    count,
    setCount,
  };

  return (
    <UserContext.Provider value={userValue}>
      <ThemeContext.Provider value={themeValue}>
        <NotificationContext.Provider value={notificationValue}>
          <div className={`app-container ${theme}`}>
            <Navbar />

            <main className="main-content">
              <h1>React Context API Practice</h1>

              <ThemeDemo />

              <section className={`theme-box ${theme}`}>
                <h2>Context Without Prop Drilling</h2>
                <p>
                  The component below reads the theme directly
                  from ThemeContext.
                </p>

                <DeepChild />
              </section>

              <NotificationDemo />
            </main>
          </div>
        </NotificationContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

export default App;