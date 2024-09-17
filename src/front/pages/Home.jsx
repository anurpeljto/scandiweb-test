import React, { useEffect, useState } from "react";
import { Navbar, Hero, Cart } from '../components/index';

const Home = ({category, toggleCart, cart, setActive}) => {

  const handleToggleCart = () => {
    toggleCart(!cart);
  };

  return (
    <div>
      {/* <Navbar cart={cart} handleToggleCart={handleToggleCart} isActive={isActive} setActive={setActive} /> */}
      <Hero handleToggleCart={handleToggleCart} cart={cart} category={category} setActive={setActive}/>
      {/* <Cart visible={cart} /> */}
    </div>
  );
};

export default Home;
