import React, { useEffect } from 'react'
import ItemListing from './ItemListing'
import { useState} from 'react';

const Hero = ({category, cart, setActive, handleToggleCart}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setActive(category);
    const fetchData = async() => {
      try {
        let query = ``;
        if (category.id === 1) {
          query = `{
            products {
              name
              id
              price {
                amount
                currency_symbol
              }
              attributes {
              type
              name
              displayValue}
              description
              gallery
              inStock
            }
          }`;
        } else {
          query = `
            {
              productsByCategory(category_id: ${category.id}) {
                name
                id
                price {
                  amount
                  currency_symbol
                }
                attributes {
                  type
                  name
                  displayValue}
                description
                gallery
                inStock
              }
            }
          `
        }

        const response = await fetch('http://138.197.176.133:3000/graphql', {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({query}),
      });

      const data = await response.json();
      // console.log(data);
      const productResponse  = data.data.products || data.data.productsByCategory;
      setProducts(productResponse);
      }
      catch (error) {
        console.error(error);
      }
    }
      fetchData();
    }, [category.name]);

  return (
    <div className='relative'>
      {
        cart && (
          <div data-testid="cart-overlay" className='absolute inset-0 bg-gray-500 opacity-50 z-10'> </div>
        )
      }
      <div id='home' className='sm:mx-24 mx-4 flex flex-col sm:py-24 py-5 gap-20 z-20'>
        <h1 className='text-2xl sm:text-3xl'>{category.name.toUpperCase()}</h1>
        <div className='md:grid md:grid-cols-3 flex flex-col gap-10 px-0 py-2 w-full'>
            {/* <ItemListing item_name="Dress" item_price="$50.00" image={dress} />
            <ItemListing item_name="Dress2" item_price="$70.00" image={dress2}/>
            <ItemListing item_name="Dress 3" item_price="$50.00" image={sweater}/>
            <ItemListing item_name="Dress" item_price="$50.00" image={dress} />
            <ItemListing item_name="Dress2" item_price="$70.00" image={dress2} stock={1}/>
            <ItemListing item_name="Dress 3" item_price="$50.00" image={sweater} stock={0}/> */}

            {
              products.map((product, index) => {
                return <ItemListing handleToggleCart={handleToggleCart} key={index} item_name={product.name} item_id= {`${product.id}`} description={product.description} attributes={product.attributes} price_amount={product.price.amount} price_symbol = {product.price.currency_symbol} gallery={product.gallery} image={product.gallery[0]} stock={product.inStock} />
              })
            }
        </div>
        
      </div>
    </div>
  )
}

export default Hero
