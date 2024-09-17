import React, { useState, useContext, useEffect } from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { GiShoppingBag } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import {colors} from '../constants'
import Cart from './Cart/Cart';
import { useNavigate } from 'react-router';
import { CartContext, useCart } from './Cart/CartContext';




const Navbar = ({cart, handleToggleCart, isActive, setActive}) => {
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const {getTotalItemCount} = useCart();
  const totalItemCount = getTotalItemCount();
  // console.log(totalItemCount);


  const handleActiveCategory = (category) => {
    setActive(category == isActive ? category : category);
    setShowMobileMenu(!showMobileMenu);
    const setActiveCategory = async() => {
      await fetch('https://scandiweb-test-s5ph.onrender.com/graphql', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `mutation {
            setActiveCategory(category_name: ${category.name})
          }`
        }),
      });

    }

    setActiveCategory();
    navigate(`/${category.name}`);
  }

  return (
    <div>
      <div className='w-max-[1240px] sm:flex justify-between items-center flex-row h-24 sm:mx-24 mx-4 text-black hidden'>

              {/* top-left nav box */}
              <div onClick ={() => {
                        if(cart === true) handleToggleCart();
                      }}
                className='flex-1'>
                <ul className='flex flex-row sm:gap-10 gap-2 cursor-pointer'>
                    <a href="/all" data-testid={isActive.name === 'all' ? 'active-category-link' : 'category-link'} onClick={(e) => {
                      e.preventDefault();
                      handleActiveCategory({name: 'all', id: 1})}} className={`font-normal text-xl py-6 ${isActive.name === 'all'?  'text-green-500 border-b border-b-green-500' : ''}` }>ALL</a>

                    <a href="/clothes" data-testid={isActive.name === 'clothes' ? 'active-category-link' : 'category-link'} onClick={(e) => {
                      e.preventDefault();
                      handleActiveCategory({name: 'clothes', id:2})}}
                     className={`font-normal text-xl py-6 ${isActive.name === 'clothes' ? 'text-green-500 border-b border-b-green-500' : ''}`}>CLOTHES</a>

                    <a href="/tech" data-testid={isActive.name === 'tech' ? 'active-category-link' : 'category-link'} onClick={(e) => {
                      e.preventDefault();
                      handleActiveCategory({name: 'tech', id:3})}}
                      className={`font-normal text-xl py-6 ${isActive.name === 'tech' ? 'text-green-500 border-b border-b-green-500' : ''}`}>TECH</a>
                </ul>
              </div>
              
              <div className='flex-1 flex justify-center mb-0.5'> 
                <GiShoppingBag size={35} fill={`${colors.green}`}/>
              </div>
              
              <div className='relative flex-1 flex justify-end' onClick={() => handleToggleCart()}>
                <div data-testid='cart-btn'>
                <CiShoppingCart size={35} className='cursor-pointer'/>
                <div data-testid="cart-count-bubble" className='cursor-pointer absolute top-[-10px] right-[-5px] bg-green-400 text-white rounded-full flex items-center text-[10px] justify-center w-fit h-fit p-2'>
                    {totalItemCount}
                  </div>
                </div>
              </div>
          </div>
      
      <div className='justify-between items-center flex flex-row sm:hidden h-full mt-2 mx-4'>
        <RxHamburgerMenu size={30} onClick={() => {
          if(cart === true) handleToggleCart();
          setShowMobileMenu(!showMobileMenu)}}/>
        <h1 className='text-2xl font-light'>Scandiweb</h1>
        <div>
            <CiShoppingCart size={35} onClick={() => handleToggleCart()}/>
            {totalItemCount > 0 && (
                  <div onClick={() => handleToggleCart()} className='absolute top-0 right-3 bg-green-400 text-white rounded-full flex items-center text-[10px] justify-center w-fit h-fit p-2'>
                      {totalItemCount}
                    </div>
                )}
        </div>
      </div>

      <div className={`sm:hidden ${showMobileMenu? '' : 'hidden'} flex flex-row bg-white absolute w-[100%] top-10 left-4 z-[10] py-2 ease-in-out duration-700`}>
        <ul className='flex flex-col gap-2'>
          {/* <li className='border-b border-green-300' onClick={() => handleActiveCategory({name: 'all', id: 1})}>ALL</li>
          <li className='border-b border-green-300' onClick={() => handleActiveCategory({name: 'clothes', id:2})}>CLOTHES</li>
          <li onClick={() => handleActiveCategory({name:'tech', id:3})}>TECH</li> */}
          <a href='/all'  onClick={(e) => {
                      e.preventDefault();
                      handleActiveCategory({name: 'all', id: 1})}} className={`font-normal text-xl py-6 ${isActive.name === 'all'?  'text-green-500 border-b border-b-green-500' : ''}` }>ALL</a>

                    <a href='/clothes' onClick={(e) => {
                      e.preventDefault();
                      handleActiveCategory({name: 'clothes', id:2})}}
                     className={`font-normal text-xl py-6 ${isActive.name === 'clothes' ? 'text-green-500 border-b border-b-green-500' : ''}`}>CLOTHES</a>

                    <a href='/tech'  onClick={(e) => {
                      e.preventDefault();
                      handleActiveCategory({name: 'tech', id:3})}}
                      className={`font-normal text-xl py-6 ${isActive.name === 'tech' ? 'text-green-500 border-b border-b-green-500' : ''}`}>TECH</a>
        </ul>
      </div>
      <Cart visible={cart} />

    </div>
    

    
    
  )
}

export default Navbar


/**
 * <div className='w-max-[1240px] flex justify-between items-center flex-row h-24 mx-24 text-black'>
        <ul className='flex flex-row gap-10'>
            <li className='font-normal text-xl py-6'>WOMEN</li>
            <li className='font-normal text-xl py-6'>MEN</li>
            <li className='font-normal text-xl py-6'>KIDS</li>
        </ul>

        <GiShoppingBag className='aboslute mr-32' size={35} fill={`${colors.green}`}/>

        <CiShoppingCart size={35}/>
    </div>
 */