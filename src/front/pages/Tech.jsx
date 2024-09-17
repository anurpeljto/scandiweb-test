import React, { useEffect, useState } from "react";
import { Navbar, Hero, Cart } from '../components/index';

const Tech = ({category, cart, setActive}) => {

  const handleToggleCart = () => {
    toggleCart(!cart);
  };

  return (
    <div>
      {/* <Navbar cart={cart} handleToggleCart={handleToggleCart} isActive={isActive} setActive={setActive} /> */}
      <Hero cart={cart} category={category} setActive={setActive}/>
      {/* <Cart visible={cart} /> */}
    </div>
  );
};

export default Tech;
