import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/myorders"
              element={<h1>My Orders</h1>}
            />
          </Route>

          <Route
            path="*"
            element={<h1>404 - Page Not Found</h1>}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;