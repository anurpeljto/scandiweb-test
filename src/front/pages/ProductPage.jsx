import React from 'react';
import {ProductImages, ProductDetails} from '../components/index';
import { useLocation } from 'react-router-dom';

const ProductPage = ({handleToggleCart, cart}) => {
  const location = useLocation();
  
  const { name, id, attributes, description, price_symbol, price_amount, gallery, stock } = location.state;
  return (
      <div className='relative min-h-screen'>
        {
          cart && (
            <div data-testid="cart-overlay" className='absolute inset-0 bg-gray-500 opacity-50 z-10 w-full h-full'> </div>
          )
        }
        <div className='grid md:grid-cols-2 md:grid-flow-col grid-cols-1 grid-flow-row mx-24 justify-center py-10 gap-5'>
          <ProductImages gallery = {location.state.gallery}/>
          <ProductDetails id={id} name={name} attributes={attributes} description={description} price_symbol={price_symbol} price_amount={price_amount} stock={stock} gallery={gallery} handleToggleCart={handleToggleCart}/>
      </div>
      </div>
    
  )
}

export default ProductPage;
