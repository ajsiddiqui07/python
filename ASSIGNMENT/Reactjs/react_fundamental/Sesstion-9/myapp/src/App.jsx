import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/Homepage";
import DealsPage from "./pages/DealsPage";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* Any unknown path displays the 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;