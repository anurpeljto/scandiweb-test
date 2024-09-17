import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";



const ProductImages = ({gallery}) => {
  const [mainImage, setMainImage] = useState(gallery[0]);
  const [currentIndex, setCurrentIndex] = useState(0);


  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1) % gallery.length;
      setMainImage(gallery[newIndex]);
      return newIndex;
    });
  }

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % gallery.length;
      setMainImage(gallery[newIndex]);
      return newIndex;
    });
  }

  return (
    <div data-testid="product-gallery" className={`flex sm:flex-row flex-col gap-4 max-h-[600px]`} onDoubleClick={(e) => e.preventDefault()}>
      <div className='sm:grid sm:grid-cols-1 sm:grid-flow-row flex flex-row justify-center max-h-[600px] gap-2 md:overflow-x-hidden overflow-x-scroll overflow-y-auto'>
        {gallery.map((thumbnail, index) => (
          <img
            key={index}
            src={gallery[index]}
            alt=''
            className='h-20 w-20 object-cover cursor-pointer'
            onClick={() => {setMainImage(thumbnail); setCurrentIndex(index)}}
          />
        ))}
      </div>
      <div className='max-h-[600px] w-full relative flex items-center justify-center' onDoubleClick={(e) => e.preventDefault()}>
        <div onClick={handlePrevImage} className='cursor-pointer absolute top-1/2 transform -translate-y-1/2 bg-gray-800 left-2 sm:h-10 sm:w-10 h-5 w-5 flex items-center justify-center'>  <FaArrowLeft fill='white'/> </div>
        <img src={mainImage} alt='main' className='w-[500px] h-full object-fill' />
        <div onClick={handleNextImage} className=' cursor-pointer absolute top-1/2 transform -translate-y-1/2 bg-gray-800 right-2 sm:h-10 sm:w-10 h-5 w-5 flex items-center justify-center'>  <FaArrowRight fill='white'/> </div>
      </div>      
    </div>
  )
}

export default ProductImages;
