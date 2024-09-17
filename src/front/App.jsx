import React from "react"
import {Navbar, Hero, Cart} from './components/index';
import Home from './pages/Home';
import Tech from './pages/Tech';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout'
import ProductPage from "./pages/ProductPage";
import {CartProvider} from './components/Cart/CartContext';

function App() {
  const [cart, toggleCart] = useState(false);
  const [isActive, setActive] = useState({name: '', id: 0});

  const handleToggleCart = () => {
    toggleCart(!cart);
  };

  return (
    <CartProvider>
      <Router>
      <Layout cart={cart} handleToggleCart={handleToggleCart} isActive={isActive} setActive={setActive}>
        <Routes>
          <Route path="/" element={<Home toggleCart={toggleCart} category={{name: 'all', id: 1}} cart={cart} setActive={setActive}/>} />
          <Route path="/all" element={<Home toggleCart={toggleCart} category={{name: 'all', id: 1}} cart={cart} setActive={setActive}/>} />
          <Route path="/details" element={<ProductPage handleToggleCart={handleToggleCart} cart={cart} />} />
          <Route path="/clothes" element={<Home toggleCart={toggleCart} category={{name: 'clothes', id: 2}} cart={cart} setActive={setActive}/>} />
          <Route path="/tech" element={<Tech toggleCart={toggleCart} category={{name: 'tech', id: 3}} cart={cart} setActive={setActive}/>} />
        </Routes>
      </Layout>
    </Router>
    </CartProvider>
    
  )
}

export default App
