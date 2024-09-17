import React, { useEffect, useState, useContext } from 'react'
import {ProductAttributeDisplay} from '../index';
import { CartContext } from './CartContext';

const CartItem = ({name, id, price_amount, price_symbol, attributes, allAttributes, gallery, onItemCountChange}) => {
    const [selectedAttributes, setSelectedAttributes] = useState(attributes);
    const {addToCart, removeFromCart, getItemCount} = useContext(CartContext);

    const [itemCount, setItemCount] = useState(getItemCount({name, attributes}));


    const handleCountIncrease = () => {
        const newCount = itemCount+1;
        setItemCount(newCount);
        const product = {id, name, attributes: selectedAttributes, allAttributes: allAttributes, price_amount, price_symbol, gallery };
        // console.log(attributes);
        // console.log(allAttributes);
        addToCart(product);
    }

    const handleCountDecrease = () => {
        if(itemCount < 1){
          const newCount = 1;
        }
        const newCount = itemCount-1;
        setItemCount(newCount);
        const product = {id, name, attributes: selectedAttributes, allAttributes: allAttributes, price_amount, price_symbol, gallery };
        removeFromCart(product);
    }


    const groupAttributesByType = (allAttributes) => {
      return allAttributes.reduce((prev, attr) => {
        if (!(attr.type in prev)) {
          prev[attr.type] = [];
        }
        prev[attr.type].push(attr.name);
        return prev;
      }, {});
    };

    const handleSelectAttribute = (type, attribute) => {
      setSelectedAttributes((selectedAttributes) => {
        const updatedAttributes = selectedAttributes.map((item) => {
          if (item.type == type) {
            return { ...item, name: attribute };
          }

          return item;
        })
        // console.log('aft: ', selectedAttributes);
        return updatedAttributes;
      })
      
    };


   const groupedAttributes = groupAttributesByType(allAttributes);
   

  return (
    <div className='grid grid-cols-3 mt-2 py-4 gap-5'>
        <div className='flex flex-col tracking-wide leading-relaxed'>
            <div className='flex flex-col gap-1'>
                <span>{name}</span>
                <span className='font-semibold'>{`${price_symbol} ${price_amount}`}</span>
            </div>

            <div className='text-normal tracking-wider flex flex-col gap-2 mt-3'>
            {
                Array.isArray(groupedAttributes) ? (
                  groupedAttributes.map((attr, index) => (
                    <div key={index} data-testid={`cart-item-attribute-${attr.type.replace(/\s+/g, '-').toLowerCase()}`}>
                      <div className='flex justify-center items-center p-2 border border-black'>
                        <span>{attr.type}: <span className="font-bold">{attr.name}</span></span>
                      </div>
                    </div>
                  ))
                ) : (
                  Object.entries(groupedAttributes).map(([type, values], index) => (
                    <div key={index} data-testid={`cart-item-attribute-${type.replace(/\s+/g, '-').toLowerCase()}`}>
                      <span>{type}: </span>
                        {
                          values.map((value, index) => {
                            return (
                              <div data-testid={`cart-item-attribute-${type.replace(/\s+/g, '-').toLowerCase()}-${value.replace(/\s+/g, '-'.toLowerCase())}${selectedAttributes.some((item) => item.type === type && item.name === value) ? `-selected` : ``}`} onClick={() => handleSelectAttribute(type, value)} key={index} 
                              className={`flex mt-2 justify-center items-center p-2 ${type === 'Color' ? `` : `border-2 border-black`}  ${
                              selectedAttributes.some((item) => item.type === type && item.name === value) 
                                ? `bg-black text-white border-4 ${type === 'Color'? `border-green-500` : ``}`
                                : 'bg-white'
                            }`}
                            style={type === 'Color' ? {backgroundColor: value} : {}}
                            >
                                <span>{type === 'Color' ? '' : value}</span>
                              </div>
                            )
                          })
                        }
                      
                    </div>
                  ))
                )
              }

            </div>
        </div>

        <div className='flex flex-col items-center justify-between'>
            <button data-testid='cart-item-amount-increase' className='border border-black h-[30px] w-[30px] text-3xl flex items-center justify-center' onClick={handleCountIncrease}>+</button>
            <span data-testid='cart-item-amount'>{itemCount}</span>
            <button data-testid='cart-item-amount-decrease' className='border border-black h-[30px] w-[30px] text-3xl flex items-center justify-center' onClick={handleCountDecrease}>-</button>
      </div>

      <div>
        <img src={gallery} alt="" className='w-[200px] h-[150px] object-cover'/>
      </div>
    </div>
  )
}

export default CartItem
