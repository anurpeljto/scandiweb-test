import React, {createContext, useState, useContext, useEffect} from 'react'

export const CartContext = createContext();

export const CartProvider =({children}) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = sessionStorage.getItem('cartItems');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      }, []);


    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((cartItem) => cartItem.name === item.name && JSON.stringify(cartItem.attributes) === JSON.stringify(item.attributes));

            if (existingItemIndex >= 0) {

                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    itemCount: (updatedItems[existingItemIndex].itemCount || 1) + (item.itemCount || 1)
                };
                sessionStorage.setItem('cartItems', JSON.stringify(updatedItems));
                return updatedItems;
            } else {
                
                return [...prevItems, { ...item, itemCount: item.itemCount || 1 }];
            }
        });
    };
    
    const removeFromCart = (item) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((cartItem) => cartItem.name === item.name && JSON.stringify(cartItem.attributes) === JSON.stringify(item.attributes));

            if (existingItemIndex >= 0) {

                if (prevItems[existingItemIndex].itemCount > 1) {
                    const updatedItems = [...prevItems];
                    updatedItems[existingItemIndex] = {
                        ...updatedItems[existingItemIndex],
                        itemCount: updatedItems[existingItemIndex].itemCount - 1
                    };
                    return updatedItems;
                } else {
                    const updatedItems = prevItems.filter((cartItem, index) => 
                        index !== existingItemIndex
                    );
                    sessionStorage.setItem('cartItems', JSON.stringify(updatedItems));
                    return updatedItems;
                }
            } else {
                return [...prevItems];
            }
        });
    };

    const calculateTotalPrice = () => {
        const total = cartItems.reduce((total, item) => total + (item.price_amount * (item.itemCount || 1)), 0);
        return parseFloat(total).toFixed(2);
    }

    const getItemCount = (item) => {
        const cartItem = cartItems.find((cartItem) => cartItem.name === item.name && JSON.stringify(cartItem.attributes) === JSON.stringify(item.attributes));
        return cartItem ? cartItem.itemCount : 0;
    }

    const getTotalItemCount = () => {
        return cartItems.reduce((count, item) => count + (item.itemCount || 1), 0);
    }

    const getAllItems = () => {
        return cartItems;
    }

    return (
        <CartContext.Provider value={{cartItems, addToCart, getItemCount, removeFromCart, getTotalItemCount, calculateTotalPrice, getAllItems, setCartItems}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);

