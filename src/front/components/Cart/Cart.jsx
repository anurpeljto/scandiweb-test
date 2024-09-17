import React, {useContext, useState} from 'react'
import {CartContext} from './CartContext';
import CartItem from './CartItem';

const Cart = ({visible}) => {
  const {cartItems, getTotalItemCount, updateItemCount, calculateTotalPrice, getAllItems, setCartItems} = useContext(CartContext);

  const totalItemCount = getTotalItemCount();


  const handleItemCountChange = (id, newCount) => {
    updateItemCount(id, newCount);
  };

  const handlePlaceOrder = async() => {
    // console.log(getAllItems())
    const items = getAllItems().map(item => `
      {
        id: "${item.id}",
        name: "${item.name}",
        itemCount: ${item.itemCount},
        price_amount: ${item.price_amount},
        price_symbol: "${item.price_symbol}",
        attributes: [${item.attributes.map(attr => `
          {
            name: "${attr.name}",
            type: "${attr.type}"
        },
        `).join(',')}],
        gallery: [${item.gallery.map(url => `"${url}"`).join(',')}]
      }
    `).join(',');

    // console.log('items mapped: ', items);

    const query = `
    mutation {
      createOrder(
        items: [${items}],
        total_amount: ${calculateTotalPrice()}
      ) {
        order_id
      }
    }
  `;

    const response = await fetch('http://138.197.176.133:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      }
    );

    const result = await response.json();
    if(result){
      alert('Order placed successfully');
      sessionStorage.removeItem('cartItems');
      setCartItems([]);
    }

  }

  if (!visible) return null;
  return (
    <div data-testid="cart-overlay" className='sm:w-[400px] sm:h-[400px] w-full bg-white absolute opacity-100 sm:center py-6 sm:right-4 overflow-y-scroll scroll-smooth sm:mx-4 px-4 z-30 flex flex-col items-start overflow-x-clip'>
      <div className=''>
        <h3 className='font-semibold'>My bag, {totalItemCount} {totalItemCount != 1 ? 'items' : 'item'} </h3>
      </div>

      {
        cartItems.map((item, index) => (
          <CartItem
            key={`${item.name}-${index}`}
            name={item.name}
            price_amount={item.price_amount}
            price_symbol = {item.price_symbol}
            attributes={item.attributes}
            allAttributes = {item.allAttributes}
            gallery={item.gallery[0]}
            onItemCountChange={handleItemCountChange}
            />
        ))
      }

      <div data-testid='cart-total' className='flex flex-row justify-between items-center w-full'>
        <h3 className='font-normal'>Total: </h3>
        <h3 className='font-bold'>${calculateTotalPrice()}</h3>
      </div>

      <div className={`w-full flex justify-center items-center`}>
        <button disabled={totalItemCount <= 0} data-testid='place-order-btn' onClick={handlePlaceOrder} className={`${totalItemCount > 0 ? `bg-green-500` : `cursor-not-allowed bg-gray-400`} text-white px-4 py-2 mt-4 w-[150px]`}>Place order</button>
      </div>
      
    </div>

    
  )
}

export default Cart
