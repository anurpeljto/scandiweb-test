import React from 'react';
import Navbar from '../Navbar';
import Cart from '../Cart/Cart';

const Layout = ({ children, cart, handleToggleCart, isActive, setActive }) => {
  return (
    <div>
      <Navbar cart={cart} handleToggleCart={handleToggleCart} isActive={isActive} setActive={setActive} />
      <main>{children}</main>
      
    </div>
  );
};

export default Layout;
