import React, { useState } from 'react';
import MasonryComponent from 'react-masonry-component';

import PropTypes from 'claptime/lib/prop-types';

const MasonryLayout = ({ children }) => {
  const [itemsOrder, setItemsOrder] = useState([]);

  const newItemsOrder = [...itemsOrder];
  children
    .filter((item) => newItemsOrder.indexOf(item.key) === -1)
    .forEach((item) => newItemsOrder.push(item.key));
  if (JSON.stringify(itemsOrder) !== JSON.stringify(newItemsOrder)) {
    setItemsOrder(newItemsOrder);
  }

  return (
    <div className="masonry-container">
      <MasonryComponent
        elementType="ul"
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
        options={{ isFitWidth: true, columnWidth: 10 }}
        style={{
          margin: '20px auto',
          padding: 0,
        }}
      >
        {children.map((element) => (
          <li
            key={element.key}
            style={{
              margin: 40,
              listStyle: 'none',
            }}
          >
            {element}
          </li>
        ))}
      </MasonryComponent>
    </div>
  );
};

MasonryLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default MasonryLayout;
