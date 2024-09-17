import React, {useContext, useState} from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { colors } from '../../constants';
import { CartContext } from '../Cart/CartContext';

const QuickShop = ({name, id, price_amount, price_symbol, attributes, allAttributes, gallery}) => {
  const {addToCart} = useContext(CartContext);
  let attrs = [];

  const getAttributes = async () => {
    const response = await fetch('https://scandiweb-test-s5ph.onrender.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: `{attributesForProduct(product_id: "${id}") {name type}}` })
    });

    const data = await response.json();
    console.log(data);
    console.log(id);
    const attributes = data.data.attributesForProduct;
    attrs = attributes;

    // console.log('attributes', attributes);

    const attributeGroups = [];
    attributes.forEach(attr => {
      if (!attributeGroups[attr.type]) {
        attributeGroups[attr.type] = []; 
      }
      attributeGroups[attr.type].push(attr.name); 
    });

    
    // console.log('groups:' ,attributeGroups);
    
    const firstAttributes = {};
    attributes.forEach(attr => {
      if (!firstAttributes[attr.type]) {
        firstAttributes[attr.type] = attr;
      }
    });

    // console.log(firstAttributes.values);
    return Object.values(firstAttributes);
  }

  const handleQuickShop = async() => {
    const firstAttributes = await getAttributes();
    const item = {name: name, id, price_amount, price_symbol, attributes: firstAttributes, allAttributes: attrs, gallery};

    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    cartItems.push(item);

    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    // console.log('item: ', item);
    addToCart(item);
  }
  return (
    <div onClick={(e) => {
      e.stopPropagation();
      handleQuickShop();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      }} 
      className={`w-[35px] h-[35px] rounded-full bg-green-500 justify-center items-center flex z-[30]`}>
        <CiShoppingCart size={25} fill='white'/>
    </div>
  )
}

export default QuickShop
