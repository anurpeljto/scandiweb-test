import React, { useState, useContext } from 'react'
import QuickShop from './QuickShop'
import { useNavigate } from 'react-router';
import { CartContext } from '../Cart/CartContext';

const ItemListing = ({item_name, price_amount, price_symbol , image, item_id, attributes, gallery, description, stock}) => {
  const [quickshop, setQuickShop] = useState(false);
  const navigate = useNavigate();

  const {addToCart} = useContext(CartContext);

  const item = {
    name: item_name, id: item_id, price_amount, price_symbol, attributes, gallery: gallery
  }

  const handleMouseEnter = () => setQuickShop(true);
  const handleMouseLeave = () => setQuickShop(false);
  const navigateToDetails = () => {
    navigate('/details', {state: {name: item_name, id: item_id, attributes, description, price_amount: price_amount, price_symbol: price_symbol, gallery, stock: stock}});
  }

  return (
    <div data-testid={`product-${item_name.replace(/\s+/g, '-').toLowerCase()}`} className={`flex flex-col gap-2 text-black cursor-pointer`} onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeave()} onClick={() => navigateToDetails()}>

        <div onClick={() => navigateToDetails()} className={`relative flex items-center justify-center w-[100%] h-[400px] overflow-hidden `}>
          <div className={`${stock <= 0 ? '' : 'hidden'} absolute text-3xl bg-gray-300 h-[100%] w-[100%] opacity-40 flex justify-center items-center`}>Out of stock</div>
          <img src={image} className='w-full h-full object-cover' alt={item_name}/>
          <div className={`${stock && quickshop ? 'absolute' : 'hidden'} bottom-2 right-2`}>
            <QuickShop {...item} />
          </div>
        </div>

        <div className='flex relative flex-row justify-between'>
          <div className='flex flex-col gap-1 mt-3'>
            <h1 className='font-light'>{item_name}</h1>
            <p className='font-semibold'>{price_symbol} {price_amount}</p>
          </div>
        </div>
        {/*  */}
    </div>
  )
}

export default ItemListing
