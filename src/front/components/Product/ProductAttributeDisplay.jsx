import React from 'react';
import { useState } from 'react';

const ProductAttributeDisplay = ({type, attributes, onSelectAttribute}) => {
    const [selectedAttribute, setSelectedAttribute] = useState('');

    const handleSelectAttribute = (attribute) => {
      setSelectedAttribute(attribute[0]);
      onSelectAttribute(type, attribute[0]);
    }

    const toCamelCase = (str) => {
      return str
          .toLowerCase()
          .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
              index === 0 ? match.toLowerCase() : match.toUpperCase()
          )
          .replace(/\s+/g, '');
      };
      const camelCased = toCamelCase(type);

  return (
    <div data-testid={`product-attribute-${type.replace(/\s+/g, '-').toLowerCase()}`} className='flex flex-col mt-4'>
        <span className='font-medium'>{type}:</span>
        <div className='flex gap-2 mt-2 md:overflow-x-clip overflow-x-scroll'>
          {attributes.map((attribute, index) => (
            <button
            key={`${type}-${attribute}-${index}`}
            data-testid={`product-attribute-${type.replace(/\s+/g, '-').toLowerCase()}-${attribute[0]}`}
              onClick={() => handleSelectAttribute(attribute)}
              className={`px-4 py-2 border ${selectedAttribute === attribute[0] ? `bg-black text-white ${type === 'Color' ? ` border-green-500 border-2`: ``}` : ''}`}
              style = {type === 'Color' ? {backgroundColor: attribute[1]} : {}}
              >
              <span data-testid={`product-attribute-${type.replace(/\s+/g, '-').toLowerCase()}-${attribute[1]}`}
              >{type != 'Color' ? attribute[0] : ''}</span>
            </button>
          ))}
        </div>
      </div>
  )
}

export default ProductAttributeDisplay
