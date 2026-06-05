import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";

function App() {

  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>

      <Navbar cart={cart} />

      <Routes>

        <Route
          path="/"
          element={<Home cart={cart} setCart={setCart} />}
        />
        <Route path="/categories" element={<Categories />} />

        <Route
          path="/category/:name"
          element={<Category cart={cart} setCart={setCart} />}
        />

        <Route path="/login" element={<Login />} />

        <Route path="/Register" element={<Register />} />

        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;