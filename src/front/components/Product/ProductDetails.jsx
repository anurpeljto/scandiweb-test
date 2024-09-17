import React, { useState, useContext, useEffect } from 'react';
import {ProductAttributeDisplay} from '../index';
import { CartContext } from '../Cart/CartContext.jsx';
import ReactHtmlParser from 'html-react-parser';


const ProductDetails = ({id, name , description, attributes, price_amount, price_symbol, stock, gallery, handleToggleCart}) => {

  const {addToCart, getItemCount} = useContext(CartContext);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [allAttributes, setAllAttributes] = useState([]);
  const [cartbtn, toggleAddToCart] = useState(false);

  const handleCartButton = (state) => {
    toggleAddToCart(state);
  };

  let attrs = [];

  const getAttributes = async () => {
    const response = await fetch('https://scandiweb-test-s5ph.onrender.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: `{attributesForProduct(product_id: "${id}") {name type displayValue}}` })
    });

    const data = await response.json();
    // console.log(data);
    // console.log(id);
    const allattributesfromdb = data.data.attributesForProduct;
    attrs = allattributesfromdb;
  }

  useEffect(() => {
    // console.log(Object.keys(attributeGroup).length);
    // console.log(selectedAttributes.length);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    selectedAttributes.length === Object.keys(attributeGroup).length ? handleCartButton(false) : handleCartButton(true);
  }, [selectedAttributes]);

  const handleSelectAttribute = (type, attribute) => {
    setSelectedAttributes(prev => {
      const existingIndex = prev.findIndex(attr => attr.type === type);
      if (existingIndex >= 0) {
        const newAttributes = [...prev];
        newAttributes[existingIndex] = { type, name: attribute };
        return newAttributes;
      } else {
        return [...prev, { type, name: attribute }];
      }
    });
  };

  const handleAddToCart = async() => {
    const itemCount = getItemCount({name});
    await getAttributes();
    // console.log(attrs);
    const product = {id, name, description, attributes: selectedAttributes, allAttributes: attrs, price_amount, price_symbol, gallery };

    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    cartItems.push(product);
    // console.log(cartItems);
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    if (itemCount <= 0) {
      handleToggleCart();
      addToCart(product);
    }
    else {
      handleToggleCart();
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
  }

  const attributeGroup = attributes.reduce((acc, attribute) => {
    if(!acc[attribute.type]) {
      acc[attribute.type] =[];
    }
    acc[attribute.type].push([attribute.name, attribute.displayValue]);
    console.log(acc);
    return acc;
  }, {});

  return (
    <div className='flex flex-col h-[100%] w-full mb-24'>
      <h1 className='text-2xl font-bold'>{name}</h1>
      {
        Object.keys(attributeGroup).map((type) => (
          <ProductAttributeDisplay key={type} type={type} attributes={attributeGroup[type]} onSelectAttribute={handleSelectAttribute}/>
        ))
      }
      <div className='mt-4'>
        <span className='font-medium'>PRICE:</span>
        <div className='text-xl font-bold mt-3'>{price_symbol} {price_amount}</div>
      </div>
      <button disabled={cartbtn} data-testid="add-to-cart" onClick={() => handleAddToCart()} className={` ${stock ? '' : 'hidden'} ${cartbtn ? `cursor-not-allowed bg-gray-500` : 'bg-green-500'}  text-white px-4 py-2 mt-4 w-[150px]`}>ADD TO CART</button>
      <div data-testid="product-description" className='mt-10 tracking-wide flex flex-col gap-2 leading-relaxed'>
        {ReactHtmlParser(description)}
      </div>

      <button className={`${!stock ? '' : 'hidden'} bg-gray-500 cursor-not-allowed text-white px-4 py-2 mt-4 w-[150px]`}>Out of stock</button>
    </div>
  )
}

export default ProductDetails;
